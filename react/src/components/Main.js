import React from "react";
import MainDefault from "./MainDefault"
import { Route, Switch } from 'react-router-dom'
import CategoriasDetalladas from "./CategoriasDetalladas"
import ListadoProducts from "./ListadoProducts"


function Main() {
    return (
        <main className="home_content">
            <Switch>
                <Route path="/" exact={true} component={MainDefault} />
                <Route path="/ListadoProducts" component={ListadoProducts} />
                <Route path="/CategoriasDetalladas" component={CategoriasDetalladas} />
            </Switch>
        </main>
    )
}

export default Main;