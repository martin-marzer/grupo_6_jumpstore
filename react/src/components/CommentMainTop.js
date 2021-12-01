import React from "react";

function Page(props){
    return(
        <div>
         <h1 className="text">Hola {props.username}</h1>
         <p className="subtitulo">Aqui tienes un resumen de tu sitio web</p>
        </div>
    )
}

export default Page;