import api from "./axios";

export const getMyOrders = ()=>
    api.get("/orders/my/");

export const getSellerOrders = () =>
    api.get("/orders/seller/");

export const sellerConfirmOrder = (orderId) =>
    api.post(`/orders/${orderId}/seller-confirm/`);

export const buyerConfirmOrder = (orderId)=>
    api.post(`/orders/${orderId}/buyer-confirm/`);