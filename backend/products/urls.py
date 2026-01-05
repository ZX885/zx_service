from django.shortcuts import render
from django.urls import path
from .api_views import (
    ProductTypeListView,
    ProductAttributeView,
    ProductListView,
    ProductListCreateView,
    ProductDetailView,
)

urlpatterns = [
    path('', ProductListCreateView.as_view()),  # список продуктов
    path('<int:pk>/', ProductDetailView.as_view()), # детал\ карточка товара
    path('types/<int:category_id>/', ProductTypeListView.as_view()),
    path('attributes/<int:product_type_id>/', ProductAttributeView.as_view()),
]
