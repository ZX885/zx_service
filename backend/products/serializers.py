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
    attribute = serializers.StringRelatedField()
    
    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'attribute', 'value']

class ProductSerializer(serializers.ModelSerializer):
    attribute_values = ProductAttributeValueSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Product
        fields = [
            'id',
            'product_type',
            'price',
            'description',
            'image',
            'attribute_values',
            'created_at',
        ]

    # def create(self, validated_data):
    #     request = self.context['request']

    #     # 🔽 получаем атрибуты
    #     attributes_data = validated_data.pop("attribute_values", [])
    #     product =Product.objects.create(
    #         seller=request.user.profile,
    #         **validated_data
    #     )
    #     # 🔽 если пришли строкой (FormData)
    #     if isinstance(attributes_data, str):
    #         attributes_data = json.loads(attributes_data)

    #     # 🔽 СОЗДАЁМ attribute_values
    #     for attr in attributes_data:
    #         ProductAttributeValue.objects.create(
    #             product=product,
    #             attribute_id=attr['attribute'],
    #             value=attr['value']
    #         )
    #     print(self.initial_data.get("attribute_values"))
    #     return product
    
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
