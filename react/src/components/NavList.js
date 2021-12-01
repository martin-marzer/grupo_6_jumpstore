import React from "react";
import ProfileContentDashboard from "./ProfileContentDashboard"

function NavList(){
    return(
        <ul className="nav_list">
            <li>
                <i className='bx bx-search'></i>
                <input type="text" placeholder="Buscar..."/>
                <span className="tooltip">Buscar</span>
            </li>
              <li>
                <a href="/administrator/users">
                  <i className='bx bx-user'></i>
                  <span className="links_name">Usuarios</span>
                </a>
                <span className="tooltip">Usuarios</span>
              </li>
              <li>
                <a href="/">
                    <i className='bx bx-chat'></i>
                  <span className="links_name">Mensajes</span>
                </a>
                <span className="tooltip">Mensajes</span>
              </li>
              <li>
                <a href="/administrator/products">
                  <i className='bx bx-closet'></i>
                  <span className="links_name">productos</span>
                </a>
                <span className="tooltip">productos</span>
              </li>
              <ProfileContentDashboard />
        </ul>
    )
}

export default NavList;