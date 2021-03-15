import React, { useState } from "react";
import uniqid from "uniqid"; //esta libreria nos genera id aleatorios
import "./listadoNombres.css";

function ListadoNombres() {
  /* Declaro mi nombre en el state de este component */
  const [nombre, setNombre] = useState("");
  const [listaDeNombres, setListaDeNombres] = useState([]);
  const [modoDeEdicion, setModoDeEdicion] = useState(false);

  /*AgregarNombreAlListado toma el nombre cargado actualmente en el state 'nombre' y lo inserta en el state listaDeNombres */
  //Recibe el event que contenia el input del form, para poder usar preventDefault y no perder el state
  const agregarNombreAlListado = (e) => {
    /* PreventDefault hace que la pagina no se recarge en el submit del form */
    e.preventDefault();
    /* Generaremos el objeto nuevoNombre que tiene el nombre y el id */
    const nuevoNombre = {
      id: uniqid(),
      name: nombre,
    };
    /* Utilizando el operador "..." de eta manera, le decimos que a ListaDeNombres le agregue el object nuevoNombre*/
    setListaDeNombres([...listaDeNombres, nuevoNombre]);
    /* Dejamos el nombre en vacio para limpiar el input */
    setNombre("");
  };
  //borrarNombre recibe el id del elemento a borrar de la lista y crea un nuevo array con todos los items excepto el recibido y lo setea en el state
  const borrarNombre = (id) => {
    const newArray = listaDeNombres.filter((item) => item.id !== id);
    setListaDeNombres(newArray);
  };
  //editar recibe el item de la lista a editar
  const editar = (item) => {
    //setea el modo edicion a true
    setModoDeEdicion(true);
    //setea el state.nombre en el nombre del item
    setNombre(item.name);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Formulario para agregar nombres</h2>
          <form
            className="form-group"
            /* Cuando haga el submit del form, llamara a un callback (para capturar el event) y este a la funcion agregarNombreAlListado */
            onSubmit={(e) => {
              agregarNombreAlListado(e);
            }}
          >
            <input
              type="text"
              placeholder="Introduce un nuevo nombre"
              className="form-control mb-3"
              /* Llamo a un callback que cuando cambie algo en el input se veran en el state */
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              value={nombre}
            />
            <input
              type="submit"
              value="Registrar Nombre"
              className="btn btn-danger form-control mb-3"
            />
          </form>
        </div>
        <div className="col-md-6">
          <h2>Listado de nombres</h2>
          <ul className="list-group">
            {listaDeNombres.map((item, index) => (
              <li key={item.id} className="list-group-item background">
                {item.name}
                <button
                  className="btn btn-danger float-right"
                  onClick={() => {
                    borrarNombre(item.id);
                  }} //Le envio a la funcion borrar nombre el item.id
                >
                  x
                </button>
                <button
                  className="btn btn-danger float-right mr-2"
                  onClick={() => {
                    editar(item);
                  }} //Le envio a la funcion editar nombre el item
                >
                  EDIT
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListadoNombres;
