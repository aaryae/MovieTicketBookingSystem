from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from movie.models import Movie, Seat, ShowTime, Booking


class MovieSerializer(ModelSerializer):
    # Explicitly handle the image field to ensure proper URL generation
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = Movie
        fields = "__all__"
    
    def to_representation(self, instance):
        """
        Override to_representation to ensure image URLs are properly formatted
        """
        representation = super().to_representation(instance)
        
        # Handle image URL properly
        if instance.image:
            # Get the full URL for the image
            request = self.context.get('request')
            if request:
                # Build full URL with domain
                representation['image'] = request.build_absolute_uri(instance.image.url)
            else:
                # Fallback to relative URL
                representation['image'] = instance.image.url
        else:
            representation['image'] = None
            
        return representation


class ShowTimeSerializer(ModelSerializer):
    # Fix the inheritance - ShowTimeSerializer should inherit from ModelSerializer, not MovieSerializer
    class Meta:
        model = ShowTime
        fields = "__all__"


class SeatSerializer(ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"  # includes is_unavailable


class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"