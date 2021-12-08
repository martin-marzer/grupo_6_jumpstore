import React from "react";

function LogoContent(){

    const buttonChange = () => {
        let btn = document.querySelector("#btn");
        let sliderbar = document.querySelector(".sliderbar");
        let searchBtn = document.querySelector(".bx-search");
        
        btn.onclick = function(){
            sliderbar.classList.toggle("active");
        }
        searchBtn.onclick = function(){
            sliderbar.classList.toggle("active");
        }
    }

    
    return(
        <div className="logo_content">
        <div className="logo_administrator">
            <i className='bx bxs-user'></i>
            <div className="logo_name">Jumpstore</div>
        </div>
        <i className='bx bx-menu' id="btn" onClick={buttonChange}></i>
        </div>
    )
}

export default LogoContent;