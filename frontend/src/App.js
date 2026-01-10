import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation";

import Home from "./pages/Home";
// import Games from "./pages/Games";
// import Platforms from "./pages/Platforms";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectRoot from "./pages/SelectRoot";
import SelectProductType from "./pages/SelectProductType";
import SelectCategory from "./pages/SelectCategory";
import SelectPlatform from "./pages/SelectPlatform";
import ProtectedRoute from "./pages/ProtectedRoute";


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

        {/* Создание покупки */}
        <Route path="/orders" element={<MyOrders />} />

        {/* <Route path="/types/:categoryId" element={<ProductType/>}/> */}
        <Route path="/users/profile/" element={<Profile />} />
        {/* Логин */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
