import React from "react";

function ListadoProducts(props){
    return(
        <div className="conteiner_general">
        <div className="form_content">
            <ul className="form_ul">
            <li className="titulo_form">Listado de productos: 2 </li>
            <li>
            <li className="titulo_form">Jumpstore</li>
            </li>
        </ul>
        </div>
    <div className="conteiner_general_list">
        <table className="table-sortable" cellSpacing="0" cellPadding="20">
            <thead>
              <tr>
                <th>Nombre<i className="fas fa-arrows-alt-v"></i></th>
                <th>Imagen</th>
                <th>Precio<i className="fas fa-arrows-alt-v"></i></th>
              </tr>
            </thead>
            <tbody>
                <tr dhref="/sneakers/detail/">
                    <td>nombre</td>
                    <td>
                    </td>
                    <td>precio</td>
              </tr>
            </tbody>
          </table>

    </div>
    </div>
    )
}

export default ListadoProducts;