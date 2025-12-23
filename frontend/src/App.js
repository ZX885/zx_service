import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Categories from "./pages/Categories";
import ProductType from "./pages/ProductTypes";
import CreateProduct from "./pages/CreateProduct";
// import logo from './logo.svg';
// import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/games" element={<Games/>}/>
        <Route path="/categories/:platformId" element={<Categories/>}/>
        <Route path="/type/:categoryId" element={<ProductType/>}/>
        <Route path="/create/:typeId" element={<CreateProduct />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
