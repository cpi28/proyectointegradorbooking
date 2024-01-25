import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { CategoryDetail } from "./routes/CategoryPage/CategoryDetail";
import {ProductDetail} from "./routes/ProductPage/ProductDetail";
import { Home } from "./routes/HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PanelAdmin } from "./routes/PanelAdmin/PanelAdmin";
import { ProductList } from "./routes/PanelAdmin/ProductList";
import { ProductAdd } from "./routes/PanelAdmin/ProductAdd";
import { CharacteristicList } from "./routes/PanelAdmin/CharacteristicList";
import { Login } from "./routes/LoginPage/Login";
import { Registro } from "./routes/RegisterPage/Register";
import {CategoryList} from "./routes/PanelAdmin/CategoryList";
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/categoria/:id" element={<CategoryDetail/>}/>
        <Route path="/producto/:id" element={<ProductDetail/>}/>
        <Route path="/administracion" element={<PanelAdmin />}/>
        <Route path="/administracion/listaproductos" element={<ProductList/>}/> 
        <Route path="/administracion/agregarproducto" element={<ProductAdd/>}/>
        <Route path="/administracion/listarcaracteristicas" element={<CharacteristicList />}/>
        <Route path="/administracion/listarcategorias" element={<CategoryList />}/>
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
