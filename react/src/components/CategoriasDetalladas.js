import React from "react";
import { useState, useEffect } from "react";

function CategoriasDetalladas() {
  const [infodataBase, setInfoDataBase] = useState({countByCategory: [ ] })
  useEffect(() => {
    fetch('http://localhost:3030/api/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setInfoDataBase(data)
      })

  }, [])
  let array = infodataBase.countByCategory.values()
  console.log(infodataBase)
  return (
    <div className="conteiner_general">
      <div className="form_content">
        <ul className="form_ul">
          <li className="titulo_form">Cantidad de categorias: {infodataBase.countByCategory}</li>
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
          {
          array.map(categorias => {
            return (
          <tbody>
            <tr dhref="/sneakers/detail/">
              <td>{categorias.count}</td>
              <td>{categorias}</td>
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

export default CategoriasDetalladas;