from django.shortcuts import render
from django.urls import path
from .api_views import (
    ProductIdListView,
    ProductAttributeView,
    ProductTypeListView,
    ProductListView,
    MyProductView,
    ProductDeleteView,
    ProductDetailView,
)

urlpatterns = [
    path('/', ProductListView.as_view()),  # список продуктов
    path('/<int:pk>/', ProductDetailView.as_view()), # детал\ карточка товара
    
    path('/my/', MyProductView.as_view(), name="my-products"),  # продукты юзера
    path('/<int:pk>/delete', ProductDeleteView.as_view()),  # продукты юзера
    
    path('/types/', ProductTypeListView.as_view()),
    path('/types/<int:category_id>/', ProductIdListView.as_view()),
    path('/attributes/<int:product_type_id>/', ProductAttributeView.as_view()),
]
