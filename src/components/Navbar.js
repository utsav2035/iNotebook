import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/Login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">iNoteBook</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={isActive =>
                                "nav-link" + (!isActive ? "active" : "")
                            } aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={isActive =>
                                "nav-link" + (!isActive ? "active" : "")} to="/about">About</NavLink>
                        </li>

                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button onClick={handleLogout} className="btn btn-primary">Log-out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar