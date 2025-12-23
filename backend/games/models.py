from django.db import models
from django.contrib.auth.models import User


# ===================== GAME =====================
class Game(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='games/', blank=True, null=True)

    def __str__(self):
        return self.title


# ===================== GAME CATEGORY =====================
class GameCategory(models.Model):
    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name='categories'
    )
    title = models.CharField(max_length=100)
    slug = models.SlugField()

    def __str__(self):
        return f"{self.game.title} - {self.title}"


# # ===================== PRODUCT TYPE =====================
# class ProductType(models.Model):
#     category = models.ForeignKey(
#         GameCategory,
#         on_delete=models.CASCADE,
#         related_name='product_types'
#     )
#     title = models.CharField(max_length=100)

#     def __str__(self):
#         return f"{self.category.title} - {self.title}"


# # ===================== PRODUCT =====================
# class Product(models.Model):
#     seller = models.ForeignKey(User, on_delete=models.CASCADE)
#     product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE)

#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     description = models.TextField()
#     is_active = models.BooleanField(default=True)

#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.product_type.title} - {self.price}$"


# # ===================== PRODUCT ATTRIBUTE =====================
# class ProductAttribute(models.Model):
#     FIELD_TYPES = (
#         ('text', 'Text'),
#         ('number', 'Number'),
#         ('boolean', 'Boolean'),
#     )

#     product_type = models.ForeignKey(
#         ProductType,
#         on_delete=models.CASCADE,
#         related_name='attributes'
#     )
#     name = models.CharField(max_length=100)
#     field_type = models.CharField(max_length=20, choices=FIELD_TYPES)

#     def __str__(self):
#         return self.name


# # ===================== PRODUCT ATTRIBUTE VALUE =====================
# class ProductAttributeValue(models.Model):
#     product = models.ForeignKey(
#         Product,
#         on_delete=models.CASCADE,
#         related_name='attribute_values'
#     )
#     attribute = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE)
#     value = models.TextField()

#     def __str__(self):
#         return f"{self.attribute.name}: {self.value}"
