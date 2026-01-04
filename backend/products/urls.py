from django.shortcuts import render
from django.urls import path
from .api_views import (
    ProductTypeListView,
    ProductAttributeView,
    ProductListView,
    ProductListCreateView,
)

urlpatterns = [
    path('types/<int:category_id>/', ProductTypeListView.as_view()),
    path('attributes/<int:product_type_id>/', ProductAttributeView.as_view()),
    path('', ProductListCreateView.as_view()),
]
