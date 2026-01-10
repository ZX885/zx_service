from django.shortcuts import render
from django.urls import path
from .api_views import (
    ProductIdListView,
    ProductAttributeView,
    ProductTypeListView,
    ProductListView,
    ProductListCreateView,
    ProductDetailView,
)

urlpatterns = [
    path('', ProductListView.as_view()),  # список продуктов
    path('/create', ProductListCreateView.as_view()),  # список продуктов
    path('<int:pk>/', ProductDetailView.as_view()), # детал\ карточка товара
    path('types/', ProductTypeListView.as_view()),
    path('types/<int:category_id>/', ProductIdListView.as_view()),
    path('attributes/<int:product_type_id>/', ProductAttributeView.as_view()),
]
