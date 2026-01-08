# from rest_framework_simplejwt.views import TokenObtainPairView
# from .serializers import MyTokenSerializer
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# from django.shortcuts import render


# class MyTokenView(TokenObtainPairView):
#     serializer_class = MyTokenSerializer


# @api_view(['POST'])
# def register(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
    
#     if Userz.objects.filter(username=username).exists():
#         return Response({"error":"User already exists"}, status=400)

#     user = Userz.objects.create_user(
#         username=username,
#         password=password
#     )
#     return Response({'success': True})
# //////////////////////////////////////////////////////////
