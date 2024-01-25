import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { TitleBar } from "../../components/Titlebar/TitleBar";
import "../PanelAdmin/CategoryList.modules.css";
import axios from 'axios';
import { Modal, Form } from "react-bootstrap";

export function CategoryList() {
  const [data, setData] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: '', description: '' });
  const [editingFeature, setEditingFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/api/categories");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (category) => {
    setSelectedCategory(category);
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory({});
    
  };

  const handleEditChange = (e) => {
    const { nombre, value } = e.target;
    setSelectedCategory({
      ...selectedCategory,
      [nombre]: value,
    });
  };

  const handleEditSave = async () => {
    try {
      setSaving(true);
      await axios.put(
        `http://127.0.0.1:8090/api/categories`,
        selectedCategory
      );
      closeModal();
      const updatedProducts = categories.map((category) =>
        category.id === selectedCategory.id ? selectedCategory: category
      );
      setCategories(updatedProducts);
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro que quieres eliminar esta categoria?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:8090/api/categories/${id}`
        );
        const updatedCategories = categories.filter((category) =>
          category.id !== id
        );
        setCategories(updatedCategories);
      } catch (error) {
        console.error(error);
      }
    }
  };

  

  const handleEditFeature = () => {
    axios
    .put(`http://127.0.0.1:8090/api/categories/${editingFeature.id}`, newFeature) 
    .then((response) => {
      setEditingFeature(null);
      setNewFeature({nombre: '', descripcion: ''})
      console.log('Categoría editada con éxito:', response.data);
      setMensaje("Categoría editada con éxito!")
      
      fetchData(); // Vuelve a cargar las características
    })
    .catch((error) => {
      // Manejo de errores
      console.error('Error al editar la categoría:', error);
      setMensaje("Error al editar la categoría!")
    });
  };

  const handleDeleteFeature = (featureId) => {
    const shouldDelete = window.confirm('¿Estás seguro de que quieres eliminar esta Categoría?');
    if (shouldDelete) {
    axios
      .delete(`http://127.0.0.1:8090/api/categories/${featureId}`) 
      .then((response) => {
        // Procesar la respuesta y realizar acciones necesarias
        console.log('Categoría eliminada con éxito:', response.data);
        setMensaje("Categoría eliminada con éxito!")
        fetchData(); // Vuelve a cargar las Categorías
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al eliminar la Categoría:', error);
        setMensaje("Error al eliminar la Categoría!")
      });
    }
  };

  return (
    <div>
      <TitleBar titulo="Lista de Categorías" />
      <div className="vista menu">
        <Sidebar />
        <table id="categories">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            {/* <th>Categoria</th> */}
            <th>Acciones</th>
          </tr>
          <tbody>
            {data.map(function (item) {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  {/* <td>{item.category}</td> */}
                  <td>
                    <button onClick={() => openModal(item)}>Editar</button>
                    <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>
            
            Editar Categoria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedCategory.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={selectedCategory.descripcion || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={closeModal}> */}
          <button onClick={closeModal}>Cancelar</button>  
          {/* </Button> */}
          {/* <Button
            variant="secondary"
            onClick={selectedProduct.id ? handleEditSave : handleAddNew}
          > */}
            {/* {saving ? "Guardando..." : "Guardar"} */}
          <button onClick={handleEditSave}>Guardar</button>  
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
      {mensaje && <p>{mensaje}</p>}
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </div>
  );
}
