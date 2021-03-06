import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

function ContentMain() {
  const [infodataBase, setInfoDataBase] = useState([])
  const [infodataBaseLastProduct, setInfoDataBaseLastItem] = useState([])
  const [infoDataBaseUser, setInfoDataBaseUser] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3030/api/users')
      .then(response => {
        return response.json()
      })
      .then(data => {
        // console.log(data);
        setInfoDataBaseUser(data)
      })
  },[])

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        // console.log(data);
        setInfoDataBase(data)
      })

  }, [])

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        let lastItem = data.products.splice(-1).pop()
        setInfoDataBaseLastItem(lastItem)
      })

  }, [])


  return (
    <div className="home">
      <article className="article_content_1">
        <a href="http://localhost:3030/administrator/users"></a>
        <section className="section_number_1">{infoDataBaseUser.count} usuarios</section>
        <i className='bx bx-user'></i>
        <section className="section_link"><p>Ver más</p></section>
      </article>
      <article className="article_content_2">
        <Link to="/CategoriasDetalladas"></Link>
        <section className="section_number_3">4 categorias</section>
        <i className='bx bx-chat'></i>
        <section className="section_link"><p>Ver más</p></section>
      </article>
      <article className="article_content_3">
        <a href="http://localhost:3030/administrator/products"></a>
        <section className="section_number_3">{infodataBase.count} productos</section>
        <i className='bx bx-closet'></i>
        <section className="section_link"><p>Ver más</p></section>
      </article>
      <article className="article_content_2">
        <a href="http://localhost:3030/administrator/products"></a>
        <section className="section_number_3">Ultimo producto creado: {infodataBaseLastProduct.name}</section>
        <section className="section_link"><p>Ver más</p></section>
      </article>
      <article className="article_content_3">
        <Link to="/ListadoProducts"></Link>
        <section className="section_number_3">Listado de productos</section>
        <section className="section_link"><p>Ver más</p></section>
      </article>
      <article className="article_content_1">
        <Link to="/CategoriasDetalladas"></Link>
        <section className="section_number_3">Categorias detalladas</section>
        <section className="section_link"><p>Ver más</p></section>
      </article>
    </div>
  )
}

export default ContentMain;