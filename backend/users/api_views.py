from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenSerializer, UserSerializer
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

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



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenSerializer
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    