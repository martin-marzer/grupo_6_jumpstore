import React from "react";
import "../assets/css/administrator.css"
import "../assets/css/administratorToolsProducts.css"
import "../assets/js/administrator.js"
import Main from "./Main.js"
import Sliderbar from './Sliderbar';

function App() {
  return (
    <React.Fragment>
      <div className="App">
      <Sliderbar />
        <Main />
      </div>
    </React.Fragment>
  );
}

export default App;
