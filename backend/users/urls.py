from django.urls import path
# from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView

from .api_views import *

urlpatterns = [
    path("register/", register),
    # path("login/", login_view, name='login'),
    # path("logout/", logout_view, name='logout'),
    path("profile/", ProfileView.as_view(), name='profile'),
    
    path("token/", MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
