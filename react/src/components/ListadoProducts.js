import React from "react";
import { useState, useEffect } from "react";

function ListadoProducts(props){
  const [infodataBase, setInfoDataBase] = useState({ products: [] })

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setInfoDataBase(data)
      })

  }, [])
    return(
      
        <div className="conteiner_general">
        <div className="form_content">
            <ul className="form_ul">
            <li className="titulo_form">Cantidad de productos:{infodataBase.count}</li>
            <li>
            <li className="titulo_form">Jumpstore</li>
            </li>
        </ul>
        </div>
       
    <div className="conteiner_general_list">
        <table className="table-sortable" cellSpacing="0" cellPadding="20">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Precio</th>
              </tr>
            </thead>
            {
          infodataBase.products.map(products => {
            return (
            <tbody>
                <tr dhref="/sneakers/detail/">
                    <td>{products.name}</td>
                    <td>  <img src={products.img} />
                    </td>
                    <td>{products.id}</td>
              </tr>
            </tbody>
               )
              })
            }
          </table>
    </div>
    </div>
    )
}

export default ListadoProducts;