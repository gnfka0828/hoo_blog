import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Menu = () => {
    const [confirmLogin, setConfirmLogin] = useState(false);
    const store = useSelector(store => store.confirmLogin);

    useEffect(() => {
        setConfirmLogin(store.confirmLogin);
    }, [store.confirmLogin]);

    return (
        <nav id="menu">
            <div className="inner">
            <ul className="links">
            <li><a href="index.html">Home</a></li>
            <li><a href="landing.html">Landing</a></li>
            <li><a href="generic.html">Generic</a></li>
            <li><a href="elements.html">Elements</a></li>
            </ul>
            <ul className="actions stacked">
            <li><Link to="/Signup" className="button primary fit">Get Started</Link></li>
            <li>
                {
                    ( confirmLogin === true ) ? <Link to="/" className="button fit">Logout</Link> : <Link to="/Login" className="button fit">Login</Link>
                }
            </li>
            </ul>
            </div>
        </nav>
    )
}

export default Menu;