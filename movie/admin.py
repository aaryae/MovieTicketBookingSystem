from django.contrib import admin
from movie.models import Movie, ShowTime, Seat, Booking

# Register your models here.
admin.site.register(Movie)
admin.site.register(ShowTime)
admin.site.register(Seat)
admin.site.register(Booking)