from .models import ProductAttribute, ProductType,ProductAttributeValue,Product
from rest_framework import serializers
import json

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'name', 'field_type']

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ['id', 'category', 'title']

class ProductAttributeValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(
        source="attribute.name"
    )
    
    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'attribute_name', 'value']

class ProductSerializer(serializers.ModelSerializer):
    attribute_values = ProductAttributeValueSerializer(
        many=True,
        read_only=True
    )
    seller_username = serializers.CharField(
        source="seller.user.username",
        read_only=True
    )
    class Meta:
        model = Product
        # fields = [
        #     'id',
        #     'title',
        #     'seller_username',
        #     'product_type',
        #     'price',
        #     'description',
        #     'image',
        #     'attribute_values',
        #     'created_at',
        # ]
        fields = "__all__"
        
    def create(self, validated_data):
        request = self.context['request']

        product = Product.objects.create(
            seller=request.user.profile,
            **validated_data
        )

        # 🔥 КЛЮЧЕВОЙ МОМЕНТ
        raw_attrs = request.data.get("attribute_values")

        if raw_attrs:
            try:
                attrs = json.loads(raw_attrs)
            except json.JSONDecodeError:
                raise serializers.ValidationError(
                    {"attribute_values": "Неверный формат JSON"}
                )

            for attr in attrs:
                ProductAttributeValue.objects.create(
                    product=product,
                    attribute_id=attr["attribute"],
                    value=attr["value"]
                )

        return product
class ProductDetailSerializer(serializers.ModelSerializer):
    seller_username = serializers.CharField(
        source="seller.user.username",
        read_only=True
    )
    product_type_title = serializers.CharField(
        source="product_type.title",
        read_only = True
    )
    attribute_values = ProductAttributeValueSerializer(many=True,read_only=True)
    
    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "price",
            "description",
            "image",
            "seller_username",
            "product_type",
            "attribute_values",
            "product_type_title",
        )


class SellerProductSerializer(serializers.ModelSerializer):
    attribute_values = ProductAttributeValueSerializer(
        many=True,
        read_only=True,
    )
    
    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "product_type",
            "price",
            "description",
            "image",
            "is_active",
            "attribute_values",
            "created_at",
        )

class ProductUpdateSerializer(serializers.ModelSerializer):
    attribute_values = ProductAttributeValueSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Product
        fields = (
            "id",
            "price",
            "description",
            "image",
            "is_active",
            "attribute_values",
        )

    def update(self, instance, validated_data):
        request= self.context["request"]
        attrs_data = validated_data.pop("attribute_values", [])

        # обновляем обычные поля продукта
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # обновляем атрибуты
        for attr_data in attrs_data:
            ProductAttributeValue.objects.update_or_create(
                product=instance,
                attribute_id=attr_data["attribute"],
                defaults={"value": attr_data["value"]},
            )

        return instance
