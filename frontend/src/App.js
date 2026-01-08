import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Platforms from "./pages/Platforms";
import Categories from "./pages/Categories";
import ProductType from "./pages/ProductTypes";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
// import logo from './logo.svg';
// import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        {/* Главная */}
        <Route path="/" element={<Home/>}/>
        {/* категории платформ */}
        <Route path={`/catalog`} element={<Games/>}/>
        {/* список платформ (PUBG, TELEGRAM) */}
        <Route path="catalog/platforms/:rootId" element={<Platforms/>}/>
        {/* Типы товаров */}
        <Route path="/categories/:categoryId/types" element={<ProductType/>}/>
        {/*  */}
        <Route path="/games/:gameId/categories" element={<Categories/>}/>
        {/* Товары */}
        <Route path="/products/" element={<Products />}/>
        <Route path="/product/:productId" element={<ProductDetail />}/>
        <Route path="/products/types/:typeId" element={<Products />}/>
        {/* Создание товара */}
        <Route path="/create/:typeId" element={<CreateProduct />}/>
        
        {/* Создание покупки */}
        <Route path="/orders" element={<MyOrders />}/>
        
        {/* <Route path="/types/:categoryId" element={<ProductType/>}/> */}
        <Route path="/users/profile/" element={<Profile />}/>
        {/* Логин */}
        <Route path="/login" element={<Login />}/>

    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
