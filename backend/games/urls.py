from django.urls import path
from .views import *

urlpatterns = [
    path("games/", GameView.as_view()),
    path("games/<int:game_id>/categories/", GameCategoryView.as_view()),
    # path("games/categories/<int:category_id>/product-type", ProductTypeView.as_view()),
    # path("product-types/<int:product_type_id>/attributes/", ProductAttributesView.as_view()),
    # path("products/create", ProductCreateView.as_view()),

]


"""
    Game (PUBG)
    └── GameCategory (Аккаунты)
        └── ProductType (UC)
            └── Product (конкретное объявление)
                    └── ProductAttributeValue (уровень, скины и т.д.)
"""