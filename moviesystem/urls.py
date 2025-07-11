"""
URL configuration for moviesystem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


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
    path('', TemplateView.as_view(template_name='index.html')),  # landing page at /
    path('superadmin/dashboard/', TemplateView.as_view(template_name='admin_pages/dashboard.html')),  # Example admin page
    path('sudo/dashboard/', TemplateView.as_view(template_name='admin_pages/dashboard.html'), name='admin-dashboard'),
    path('user/profile/', TemplateView.as_view(template_name='user_pages/profile.html')),        # Example user page
    path("login/", TemplateView.as_view(template_name="auth/login.html"), name="login"),
    path('signup/', TemplateView.as_view(template_name='auth/signup.html'), name='signup'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
