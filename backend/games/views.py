from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import *
from .serializers import *

from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView

class GameView(ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    
    
class GameCategoryView(ListAPIView):
    serializer_class = GameCategorySerializer
    
    def get_queryset(self):
        return GameCategory.objects.filter(game_id=self.kwargs["game_id"])
    

# class ProductTypeView(ListAPIView):
#     serializer_class = ProductTypeSerializer

#     def get_queryset(self):
#         return ProductType.objects.filter(category_id=self.kwargs["category_id"])
    
# class ProductAttributesView(ListAPIView):
#     serializer = ProductAttribute
    
#     def get_queryset(self):
#         product_type_id = self.kwargs['product_type_id']
#         return ProductAttribute.objects.filter(product_type_id=product_type_id) 
    
# class ProductCreateView(CreateAPIView):
#     model = ProductCreateSerializer
#     permission_classes = [IsAuthenticated]
