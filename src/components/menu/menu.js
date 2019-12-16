import React from 'react'
import "../../Assets/css/menu.css"


function menu() {
    return (
        <div className="menu">
            <div className="sidebar-container">
                <ul className="sidebar-close">
                    <li>
                        <a href="http://localhost:3000/editingfields">
                            <div className="doc-fields"></div>
                        </a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/editingviews">
                            <div className="views-add"></div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="doc-list"></div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="doc-details"></div>
                        </a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/senddocuments">
                            <div className="send-doc"></div>

                        </a>
                    </li>
                </ul>
                <ul className="sidebar">
                    <li>
                        <a href="http://localhost:3000/editingfields">
                            <div className="doc-fields"></div>
                            <p>
                                Document Fields
                        </p>
                        </a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/editingviews">
                            <div className="views-add"></div>
                            <p>
                                View Register
                        </p>
                        </a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/listdocuments">
                            <div className="doc-list"></div>
                            <p>
                                Documents List
                        </p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="doc-details"></div>
                            <p>
                                Document Details
                        </p>
                        </a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/senddocuments">
                            <div className="send-doc"></div>
                            <p>
                                Send Documents
                        </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default menu;