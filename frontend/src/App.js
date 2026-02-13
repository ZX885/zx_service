import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation";

import Home from "./pages/Home";
// import Games from "./pages/Games";
// import Platforms from "./pages/Platforms";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Profile from "./pages/profile/Profile";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/orders/MyOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectRoot from "./pages/SelectRoot";
import SelectProductType from "./pages/SelectProductType";
import SelectCategory from "./pages/SelectCategory";
import SelectPlatform from "./pages/SelectPlatform";
import ProtectedRoute from "./pages/ProtectedRoute";
import EditProduct from "./pages/EditProduct";
import SellerProduct from "./pages/ProductSeller";
import SellerOrders from "./pages/orders/SellerOrders";
import PurchaseProduct from "./pages/PurchaseProduct";
import MyProducts from "./pages/profile/MyProducts";
import MyPurchases from "./pages/profile/MyPurchases";
import ChatsPage from "./pages/messages/ChatsPage";
import ChatDetail from "./pages/messages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Главная */}
        <Route path="/" element={<Home />} />

        <Route path="/games/:gameId/categories" element={<Categories />} />
        {/* Товары */}
        <Route path="/products/" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        
        {/* Товары продавца */}
        <Route path="/seller/products/:productId/" element={<SellerProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />

        {/* Создание товара */}
        <Route path="/create/root"
          element={
            <ProtectedRoute>
              <SelectRoot />
            </ProtectedRoute>
          } />
        {/* список платформ (PUBG, TELEGRAM) */}
        <Route path="/create/platforms/:rootId" element={<SelectPlatform />} />
        <Route path="/create/categories/:platformId" element={<SelectCategory />} />
        <Route path="/create/type/:categoryId" element={<SelectProductType />} />
        <Route path="/create/product/:typeId" element={<CreateProduct />} />

        {/* покупкa */}
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/my" element={<MyOrders />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        
        <Route path="/products/:id/buy" element={<PurchaseProduct />} />

        {/* <Route path="/types/:categoryId" element={<ProductType/>}/> */}
        <Route path="/users/profile/" element={<Profile />}>
          <Route path="products" element={<MyProducts/>}/>
          <Route path="purchases" element={<MyOrders/>}/>
          {/* <Route path="purchases" element={<MyPurchases/>}/> */}
        </Route>
        
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/chats/:chatId/" element={<ChatDetail />} />

        {/* Логин */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
