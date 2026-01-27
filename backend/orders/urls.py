from django.shortcuts import render
from django.urls import path
from .api_views import (
    CreateOrderView,
    MyOrderView,
    OrderDetailView,
    SellerConfirmOrderView,
    BuyerConfirmOrderView,
    SellerOrderView,
    )

urlpatterns = [
    path('create/', CreateOrderView.as_view()),
    path('my/', MyOrderView.as_view()),
    path('seller/', SellerOrderView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),
    path('<int:order_id>/seller-confirm/', SellerConfirmOrderView.as_view()),
    path('<int:order_id>/buyer-confirm/', BuyerConfirmOrderView.as_view()),
    
]
