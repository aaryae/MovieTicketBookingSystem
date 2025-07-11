from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from movie.views import CustomAuthToken, SignupView, UserListAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', CustomAuthToken.as_view(), name='login'),
    path('api/users/', UserListAPI.as_view(), name='user-list'),
    path('movie/', include('movie.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('superadmin/dashboard/', TemplateView.as_view(template_name='admin_pages/dashboard.html')),
    path('sudo/dashboard/', TemplateView.as_view(template_name='admin_pages/dashboard.html'), name='admin-dashboard'),
    path('user/profile/', TemplateView.as_view(template_name='user_pages/profile.html')),
    path('profile/', TemplateView.as_view(template_name='user_pages/profile_landing.html'), name='user-profile-landing'),
    path("login/", TemplateView.as_view(template_name="auth/login.html"), name="login"),
    path('signup/', TemplateView.as_view(template_name='auth/signup.html'), name='signup'),
    path('booking/<int:movie_id>/', TemplateView.as_view(template_name='user_pages/booking_page.html'), name='booking-page'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Also serve static files if needed
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)