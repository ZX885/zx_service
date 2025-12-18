from django.urls import path
# from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView

from .api_views import register, login_view, logout_view, user_profile
from .views import *

urlpatterns = [
    path("register/", register),
    path("login/", login_view, name='login'),
    path("logout/", logout_view, name='logout'),
    path("profile/", user_profile, name='profile'),
    
    path("token/", MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
