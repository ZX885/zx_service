from django.shortcuts import render
from django.urls import path
from .api_views import CreateOrderView, MyOrderView, OrderDetailView

urlpatterns = [
    path('create/', CreateOrderView.as_view()),
    path('my/', MyOrderView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),
]
