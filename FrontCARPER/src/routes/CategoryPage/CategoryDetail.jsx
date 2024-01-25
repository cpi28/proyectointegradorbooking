import { ProductCard } from "../../components/Product/ProductCard";
import { TitleBar } from "../../components/Titlebar/TitleBar";
import instrumentos from "../../images/instrumentos.jpg";
import "../CategoryPage/CategoryDetail.modules.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import ReactPaginate from "react-paginate";
import data from "../../data";

export function CategoryDetail() {
  const { id } = useParams();
  //const [data, setData] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de elementos por página

  async function fetchData() {
    //const response = await fetch(`http://127.0.0.1:8090/products/categories/${id}`);
    //const data = await response.json();
    //setData(data.find(product => product.categoriaid === parseInt(id)));
    data.find(product => product.categoriaid === parseInt(id))
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  // Función para barajar los datos
  const shuffledData = shuffle(data);
  
  // Función para dividir los datos en páginas aleatorias
  const getItemsForPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return shuffledData.slice(startIndex, endIndex);
  };

  // Calcular la cantidad total de páginas
  //const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  return (
    <div className="block">
      <TitleBar titulo="Productos de la Categoría" />
      {/* <div className="card_container"> */}
      {/* {data.length > 0 ? ( */}
        <div className="grid-container">
          {data.map((item) => (
            <ProductCard
              key={item.id}
              img_src={item.img}
              titulo={item.titulo}
              descripcion={item.descripcion}
              precio={item.precio}
              categoria={item.categoria}
              id={item.id}
            />
          ))}
        </div>
      {/* ) : (
        <p>Cargando...</p>
      )} */}

      {/* <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      /> */}
      {/* <ProductCard
        img_src={instrumentos}
        titulo="Lorem ipsum"
        descripcion="Lorem ipsum dolor sit amet."
        precio="$550"
      />
      <ProductCard
        img_src={instrumentos}
        titulo="Lorem ipsum"
        descripcion="Lorem ipsum dolor sit amet."
        precio="$550"
      /> */}
      {/* </div> */}
    </div>
  );
}
