import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation ,  } from 'react-router'

export default function Navbar() {
    let location = useLocation();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">iNotebook</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active": ""} ` } aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/about" ? "active": ""} ` } to="/about">About</Link>
                    </li>               
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}
