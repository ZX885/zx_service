from django.contrib import admin
from .models import (
    Game,
    GameCategory,
    # ProductType,
    # Product,
    # ProductAttribute,
    # ProductAttributeValue
)

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug":("title",)}
    list_display = ("title",)
    
@admin.register(GameCategory)
class GameCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ("title", "game")

# @admin.register(ProductType)
# class ProductTypeAdmin(admin.ModelAdmin):
#     list_display = ("title", "category")

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("id", "product_type", "seller", "price", "is_active")
#     list_filter = ("is_active", "product_type")
    
# @admin.register(ProductAttribute)
# class ProductAttributeAdmin(admin.ModelAdmin):
#     list_display = ("name", "product_type", "field_type")
    
# @admin.register(ProductAttributeValue)
# class ProductAttibuteValueAdmin(admin.ModelAdmin):
#     list_display = ("product", "attribute", "value")

"""
    1️⃣ Создать Game (PUBG, Clash Royale)
    2️⃣ Внутри — GameCategory (Аккаунты, UC)
    3️⃣ Внутри — ProductType (Продажа аккаунта, UC 60, UC 300)
    4️⃣ Для типа — Attributes (уровень, скины, привязка)
    5️⃣ Продавец создаёт Product
    6️⃣ Значения атрибутов — ProductAttributeValue
"""