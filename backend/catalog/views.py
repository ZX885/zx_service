from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import RootCategory, Platform, Category
from .serializers import(
    RootCategorySerializer,
    PlatformSerializer,
    CategorySerializer
)

class RootCategoryListView(ListAPIView):
    queryset = RootCategory.objects.all()
    serializer_class = RootCategorySerializer
    
class PlatformListView(ListAPIView):
    serializer_class = PlatformSerializer
    
    def get_queryset(self):
        root_id = self.kwargs['root_id']
        return Platform.objects.filter(root_id=root_id)
    
    
class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        platform_id = self.kwargs['platform_id']
        return Category.objects.filter(platform_id=platform_id)
    