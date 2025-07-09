from rest_framework.routers import DefaultRouter

from movie.views import MovieAPI, SeatAPI, ShowTimeAPI, BookingAPI


router = DefaultRouter()
router.register(r"movies", MovieAPI, basename="movie")
router.register(r"seats", SeatAPI, basename="seat")
router.register(r"showtimes", ShowTimeAPI, basename="showtime")
router.register(r"booking", BookingAPI, basename="booking")


urlpatterns = router.urls