from rest_framework.serializers import ModelSerializer
from movie.models import Movie, Seat, ShowTime, Booking


class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"

class ShowTimeSerializer(MovieSerializer):
    class Meta:
        model = ShowTime
        fields = "__all__"

class SeatSerializer(ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"

class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"