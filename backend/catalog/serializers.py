from rest_framework import serializers
from .models import RootCategory, Platform, Category


class RootCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RootCategory
        fields = ['id', 'title', 'slug']
        
        
class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['id', 'title','image', 'slug']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'slug']