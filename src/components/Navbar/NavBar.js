import React from 'react';
import { NavLink } from "react-router-dom";
// import SignInLinks from './SignInLinks';
// import SignOutLinks from './SignOutLinks';
  
export default function() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" exact className="navbar-brand">MyFood</NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" exact className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create/recipe" className="nav-link">New recipe</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create/ingredient" className="nav-link">New ingedient</NavLink>
                    </li>
                </ul>
                {/* <SignInLinks/> */}
                {/* <SignOutLinks/> */}
            </div>
        </nav>
    )
}
