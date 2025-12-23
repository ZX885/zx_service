from rest_framework import serializers
from .models import *

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"
        
class GameCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameCategory
        # fields = "__all__"
        fields = ['id', 'title', 'slug']


# class ProductTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductType
#         fields = "__all__"


# class ProductAttributeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductAttribute
#         fields = ['id', 'name', 'field_type']

# # API: Сохранение значений атрибутов
# class ProductAttributeValueSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductAttributeValue
#         fields = ['product', 'attribute', 'value']

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = "__all__"

# # API: Создание продукта (POST)
# class ProductCreateSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Product
    #     fields = ['product_type', 'price', 'description']
        
    # def create(self, validate_data):
    #     user = self.context['request'].user
    #     return Product.obkects.create(seller=user, **validate_data)