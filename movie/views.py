from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from django_filters import rest_framework as filters
from rest_framework import permissions, status
from rest_framework.response import Response
from django.db import transaction
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser


from movie.models import Movie, ShowTime, Seat, Booking
from movie.serializers import MovieSerializer, SeatSerializer, ShowTimeSerializer, BookingSerializer

class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")  # <-- get email

        if not username or not password or not email:
            return Response({"error": "Username, email, and password required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)  # <-- set email
        token = Token.objects.create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    

class MovieAPI(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class ShowTimeAPI(ModelViewSet):
    queryset = ShowTime.objects.all()
    serializer_class = ShowTimeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('movie',)

class SeatAPI(ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('showtime', 'is_booked', 'is_unavailable')

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

class BookingAPI(ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('seat',)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        seat_id = request.data.get("seat")

        if not seat_id:
            return Response({"error": "Seat ID is required"}, status=400)

        try:
            seat = Seat.objects.select_for_update().get(id=seat_id)
        except Seat.DoesNotExist:
            return Response({"error": "Seat not found"}, status=404)

        if seat.is_booked:
            return Response({"error": "Seat already booked"}, status=400)

        # Mark seat as booked
        seat.is_booked = True
        seat.save()

        booking = Booking.objects.create(user=request.user, seat=seat)
        serializer = self.get_serializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        booking = self.get_object()

        # Prevent users from canceling others' bookings
        if booking.user != request.user:
            return Response({"error": "Permission denied"}, status=403)

        # Free the seat
        seat = booking.seat
        seat.is_booked = False
        seat.save()

        booking.delete()
        return Response({"message": "Booking cancelled"}, status=status.HTTP_204_NO_CONTENT)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        # Determine role
        if user.is_superuser:
            role = 'admin'
        elif user.is_staff:
            role = 'staff'
        else:
            role = 'user'
        return Response({
            'token': token.key,
            'role': role
        })

class UserListAPI(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        users = User.objects.all().values('id', 'username', 'email', 'is_staff', 'is_superuser')
        return Response(list(users))