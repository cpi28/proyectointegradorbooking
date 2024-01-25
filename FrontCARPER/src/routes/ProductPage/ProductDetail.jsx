import { ProductBody } from "../../components/Product/ProductBody";
import { TitleBar } from "../../components/Titlebar/TitleBar";
import flecha from "../../images/ico-flecha.png";
import data from "../../data";
import "../ProductPage/ProductDetail.modules.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Gallery } from "../../components/Product/Gallery";
//import { Characteristics } from "../components/Characteristics";
import ico_marca from "../../images/flag-solid.svg";
import ico_modelo from "../../images/asterisk-solid.svg";
import ico_electrico from "../../images/bolt-solid.svg";
import ico_protector from "../../images/gift-solid.svg";
import { Policies } from "../../components/Product/Policies";


export function ProductDetail() {
  const { id } = useParams();
  const [detalle, setDetalle] = useState([]);
  

  async function getData() {
    // const response = await fetch(`http://127.0.0.1:8090/products/${id}`);
    // const data = await response.json();
    setDetalle(data.find(product => product.id === parseInt(id)));
  }
  console.log(detalle);

  useEffect(() => {
    getData();
  }, [id]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="block">
      <TitleBar titulo="Detalle del Producto" />
      <a href="#" className="flecha" onClick={handleGoBack}>
        <img src={flecha} alt="" />
      </a>

      {/* <ProductBody
          key={detalle.id}
          img_src={detalle.img}
          name={detalle.titulo}
          // category={detalle.categoria && detalle.category.name}
          category={detalle.categoria}
          description={detalle.descripcion}
          price={detalle.precio}
        /> */}
        <h3>{detalle.titulo}</h3>
      <img className="producto-img" src={detalle.img} alt={`${detalle.titulo}-img-${detalle.id}`} />
      <div className="container">
        <h4>Categoría</h4>
        <p className="prod-par">{detalle.categoria}</p>
        <h4>Descripción</h4>
        <p className="prod-par">{detalle.descripcion}</p>

        <p className="precio">Precio de alquiler: {detalle.precio}</p>
      </div>

      {/* <Caracteristicas
        marca={detalle.marca}
        modelo={detalle.modelo}
        electrico={detalle.electrico}
        protector={detalle.protector}
      /> */}

      <div>
        <h4 className="caract-title">Características</h4>
        <div className="caracteristicas iconos">
          <div className="celda">
            <img src={ico_marca} alt="" />
            <p>Marca: </p>
            <p> {detalle.marca}</p>
          </div>
          <div className="celda">
            <img src={ico_modelo} alt="" />
            <p>Modelo: </p>
            <p> {detalle.modelo}</p>
          </div>
          <div className="celda">
            <img src={ico_electrico} alt="" />
            <p>Está en stock: </p>
            {/* <p> {detalle.active}</p> */}
            <p> Si</p>
          </div>
          
        </div>
      </div>

      
      <Policies />
    </div>
  );
}
