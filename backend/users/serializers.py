from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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