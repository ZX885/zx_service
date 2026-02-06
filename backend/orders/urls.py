from django.shortcuts import render
from django.urls import path
from .api_views import (
    CreateOrderView,
    MyOrderView,
    MyPurchaseView,
    OrderDetailView,
    SellerConfirmOrderView,
    BuyerConfirmOrderView,
    SellerOrderView,
    OrderAttributeByProductView,
    )

urlpatterns = [
    path('create/', CreateOrderView.as_view()),
    path('my/', MyOrderView.as_view()),
    path('my/purchases/', MyPurchaseView.as_view()),
    path('seller/', SellerOrderView.as_view()),
    
    path('<int:pk>/', OrderDetailView.as_view()),
    path('attributes/<int:product_id>/', OrderAttributeByProductView.as_view()),
    path('<int:order_id>/seller-confirm/', SellerConfirmOrderView.as_view()),
    path('<int:order_id>/buyer-confirm/', BuyerConfirmOrderView.as_view()),
    
]
