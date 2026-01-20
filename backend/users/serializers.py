from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )
    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            # "email",
            # "is_staff",
            
            "balance",
            "created_at",
            "frozen_balance",
            "is_verified",
        ]
        
        read_only_fields = [
            "balance",
            "frozen_balance",
            "is_verified",
            "created_at",
        ]


class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token =super().get_token(user)
        token['is_admin'] = user.is_staff
        # data['is_seller'] = user.is_seller
        # data['username'] = user.username
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_admin'] = self.user.is_staff
        # data['is_seller'] = self.user.is_seller
        # data['username'] = self.user.username
        return data
    
class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = []