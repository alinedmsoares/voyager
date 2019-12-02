import React from 'react'
import "../../Assets/css/menu.css"


function menu(){
    return (
    <div className="menu">
        <div className="sidebar-container">
            <ul className="sidebar">
                <li className="account-li">
                    <a href="#">
                        <div className="account-img"></div>
                        <div>
                            Minha conta
                        </div>
                    </a>
                </li>
                <li>
                    <a href="http://localhost:3000/editingfields">
                        <div className="doc-fields"></div>
                        <div>
                            Campos do Document
                        </div>
                    </a>
                </li>
                <li>
                    <a href="http://localhost:3000/editingviews">
                        <div className="views-add"></div>
                        <div>
                            Cadastro de Views
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="doc-list"></div>
                        <div>
                            Lista de Documents
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="doc-details"></div>
                        <div>
                            Detalhes do Document
                        </div>
                    </a>
                </li>
                <li>
                    <a href="http://localhost:3000/senddocuments">
                        <div className="send-doc"></div>
                        <div>
                            Envio de Document
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    );
}
export default menu;