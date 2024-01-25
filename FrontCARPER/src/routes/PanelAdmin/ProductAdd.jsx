/* eslint-disable no-unused-labels */
import { useState, useEffect } from "react";
import "../PanelAdmin/ProductAdd.modules.css";
import { TitleBar } from "../../components/Titlebar/TitleBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

export function ProductAdd() {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    marca: "",
    modelo: "",
    categoria: "",       
    imagenes: [],    
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [largeImage, setLargeImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

   const handleImagenesChange = (e) => {
    // Maneja la subida de imágenes y actualiza el estado "imagenes"
    const selectedFiles = Array.from(e.target.files);
    setProduct({ images: selectedFiles });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      // const imagesArray = selectedImages.split(',').map((img) => img.trim());

      const data = {
        //nombre: selectedProduct.name,
        //descripcion: selectedProduct.description,
        // categoria: selectedProduct.category,
        //precio: selectedProduct.price,
        // imagenes: imagesArray,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        marca: product.marca,
        modelo: product.modelo,
        categoria: product.categoria,
        imagenes: product.imagenes,
      };

      await axios.post(
        `http://localhost:8090/api/products`,
        data
        //product
      );
        setMensaje("Producto guardado con éxito!");
      const response = await axios.get(
        `http://localhost:8090/api/products`
      );
      setProducts(response.data);
      // closeModal();
      //setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  

  return (
    <div className="formulario">
      <TitleBar titulo="Agregar Producto" />
      <div className="vista menu">
        <Sidebar />
        <form onSubmit={handleSubmit} className="product-form">
          <div>
            <label>Nombre del producto</label>
            <input type="text" value={product.nombre} 
            onChange={(e) => setProduct({nombre: e.target.value})} 
            //onChange={handleChange}
            />
            {/* {error && <p style={{ color: "red" }}>El nombre ya está en uso.</p>} */}
          </div>
          <div>
            <label>Descripción</label>
            <textarea value={product.descripcion} 
            onChange={(e) => setProduct({descripcion: e.target.value})}
            //onChange={handleChange} 
            />
          </div>
          <div>
            <label>Imágenes del producto</label>
            <input
              // className="boton"
              // type="file"
              // accept="image/*"
              // multiple
              type="text"
              value={product.imagenes}
              onChange={(e) => setProduct({imagenes: e.target.value})}
              //onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              value={product.precio}
              onChange={(e) => setProduct({precio: e.target.value})}
              //onChange={handleChange}
            />
          </div>
          <div>
            <label>Marca</label>
            <input type="text" value={product.marca} 
            onChange={(e) => setProduct({marca: e.target.value})} 
            //onChange={handleChange}
            />
          </div>
          <div>
            <label>Modelo</label>
            <input type="text" value={product.modelo} 
            onChange={(e) => setProduct({modelo: e.target.value})} 
            //onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Categoria</label>
            <input
              type="number"
              value={product.category}
              onChange={(e) => setProduct({category: e.target.value})}
              //onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-form">Agregar Producto</button>
          {error && <p className="error">{error}</p>}
          {mensaje && <p className="enviado">{mensaje}</p>}
        </form>
      </div>
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </div>
  );
}
