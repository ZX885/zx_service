import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Categories from "./pages/Categories";
import ProductType from "./pages/ProductTypes";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
// import logo from './logo.svg';
// import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        {/* Главная */}
        <Route path="/" element={<Home/>}/>
        {/* список платформ (PUBG, TELEGRAM) */}
        <Route path="/games" element={<Games/>}/>
        {/* категории платформ */}
        <Route path={`/games/:gameId/categories`} element={<Categories/>}/>
        {/* Типы товаров */}
        <Route path="/categories/:categoryId/types" element={<ProductType/>}/>
        {/* Товары */}
        <Route path="/products/:typeId" element={<Products />}/>
        {/* Создание товара */}
        <Route path="/create/:typeId" element={<CreateProduct />}/>
        
        {/* <Route path="/types/:categoryId" element={<ProductType/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
