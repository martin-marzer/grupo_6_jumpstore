import React from "react";
/*import usuarioAdministrador from '../public/assets/images/usuarioAdministrador.png';*/

function ProfileContentDashboard(){
    return(
        <div className="profile_content">
                  <div className="profile">
                      <div className="profile_details">
                        <div className="name_job">
                            <div className="name">
                              a
                            </div>
                            <div className="job">Vendedor</div>
                        </div>
                      </div>
                      <a href="/">
                        <i className='bx bx-log-out' id="log_out"></i>
                      </a>  
                  </div>
              </div>
    )
}

export default ProfileContentDashboard;