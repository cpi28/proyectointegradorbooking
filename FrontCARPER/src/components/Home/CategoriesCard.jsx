/* eslint-disable react/prop-types */
import "../Home/CategoriesCard.modules.css";
import { Link } from "react-router-dom";

export function CategoriesCard({ img_src, titulo, descripcion, id }) {
  return (
    <div className="cat_card">
      <Link to={`/categoria/${id}`}>
        <img src={img_src} alt={titulo} />
        <h4>{titulo}</h4>
        <p>{descripcion}</p>
      </Link>
    </div>
  );
}
