/* eslint-disable react/prop-types */
import "../Product/ProductBody.modules.css";
import { useEffect, useState } from "react";
import { Gallery } from "./Gallery";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaShare } from "react-icons/fa";
import ProductShareDialog from "./ProductoShareDialog";

export function ProductBody({id, titulo, descripcion, img, categoria, precio}) 
{
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const onShareClick = () => {
    setIsShareDialogOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderStyle = {
    maxWidth: '100%',  // Ajusta el ancho máximo del carrusel
    margin: '0 auto',  // Centra el carrusel en el contenedor
  };
  return (
    <div className="prod_chars">
      <h3>{titulo}</h3>
      {/* {Array.isArray(img_src) && img_src.length > 0 && (
        <div>
          {img_src.map((url, index) => (
            <img key={index} src={url} alt={`${titulo}-img-${index}`} />
          ))}
        </div>
      )} */}
      <img src={img} alt={`${titulo}-img-${id}`} />
      {/* <Gallery img_src={img}/> */}
      <div>
      {/* <Slider {...settings}> */}
        {/* {img &&
          img.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${titulo}-img-${index}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          ))} */}
      {/* </Slider> */}
      </div>
      <div className="container">
        <h4>Categoría</h4>
        <p className="prod-par">{categoria}</p>
        <h4>Descripción</h4>
        <p className="prod-par">{descripcion}</p>

        <p className="precio">Precio de alquiler: {precio}</p>
      </div>
      {/* <button>Reservar</button> */}
      <button onClick={onShareClick}>
        <FaShare />
      </button>
      {/* {isShareDialogOpen && <ProductShareDialog product={name, description, price, img_src} />} */}
    </div>
  );
}
