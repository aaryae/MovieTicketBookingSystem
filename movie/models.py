from django.db import models
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    duration_in_min = models.IntegerField()
    genre = models.CharField(max_length=100)
    image = models.ImageField(upload_to='movie_posters/', null=True, blank=True)

    def __str__(self):
        return self.title


class ShowTime(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="showtimes")
    start_time = models.DateTimeField()

    def __str__(self):
        return f"{self.movie.title} - {self.start_time}"
    

class Seat(models.Model):
    showtime = models.ForeignKey(ShowTime, on_delete=models.CASCADE, related_name="seats")
    seat_number = models.CharField(max_length=500)
    is_booked = models.BooleanField(default=False)
    is_unavailable = models.BooleanField(default=False)  # Admin can mark seat as unavailable

    def __str__(self):
        return f"{self.showtime} - Seat {self.seat_number}"
    
    
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    seat = models.OneToOneField(Seat, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} booked {self.seat} of movie {self.seat.showtime.movie.title} on {self.seat.showtime.start_time}"
