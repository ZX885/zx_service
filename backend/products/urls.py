from django.shortcuts import render
from django.urls import path
from .views import (
    ProductTypeListView,
    ProductAttributeView,
    ProductListView,
)

urlpatterns = [
    path('types/<int:category_id>/', ProductTypeListView.as_view()),
    path('attributes/<int:product_type_id>/', ProductAttributeView.as_view()),
    path('', ProductListView.as_view()),
]
