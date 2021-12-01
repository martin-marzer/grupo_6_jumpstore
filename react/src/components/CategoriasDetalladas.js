import React from "react";

function CategoriasDetalladas(props){
    return(
        <div className="conteiner_general">
        <div className="form_content">
            <ul className="form_ul">
            <li className="titulo_form">Cantidad de categorias: 2</li>
            <li>
            <li className="titulo_form">Jumpstore</li>
            </li>
        </ul>
        </div>
    <div className="conteiner_general_list">
        <table className="table-sortable" cellSpacing="0" cellPadding="20">
            <thead>
              <tr>
                <th>Marca</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
                <tr dhref="/sneakers/detail/">
                    <td>Marca</td>
                    <td>Cantidad</td>
              </tr>
            </tbody>
          </table>

    </div>
    </div>
    )
}

export default CategoriasDetalladas;