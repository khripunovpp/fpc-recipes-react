import React from 'react';
import { Link } from "react-router-dom";
import SignInLinks from './SignInLinks';
import SignOutLinks from './SignOutLinks';
  
export default function() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create/recipe">New recipe</Link></li>
                <li><Link to="/create/ingredient">New ingedient</Link></li>
            </ul>
            {/* <SignInLinks/> */}
            {/* <SignOutLinks/> */}
        </nav>
    )
}
