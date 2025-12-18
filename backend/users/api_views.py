from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')
    
    if password != password2:
        return Response({'error': 'Пароли не совпадают'}, status=400)
    if not username or not password:
        return Response({'error': 'Пожалуйста заполните оба имя и пароль '})
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Имя уже используется'}, status=400)
    if not email:
        return Response({'error': 'Пожалуйства введите почту'}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'success': True}, status=201)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        refresh: RefreshToken.for_user(user)
        return Response({
            'refresh':str(refresh),
            'access':str(refresh.access_token),
            'username':user.username,
            'is_admin':user.is_admin,
        })
    else:
        return Response({'error': 'Неправильные данные'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        token= RefreshToken(request.data.get('refresh'))
        token=blacklist()
        return Response({'success': "Успешный выход с аккаунта"})
    except Exception as a:
        return Response({'error':str(e)}, status=400)
    
@api_view(['POST'])
def user_profile(request):
    user = request.user
    return Response({
        'username':user.username,
        'email':user.email,
        'is_admin':user.is_admin
    })