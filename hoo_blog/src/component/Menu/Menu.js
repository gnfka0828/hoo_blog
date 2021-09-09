import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

const Menu = () => {
    const [confirmLogin, setConfirmLogin] = useState(false);
    const store = useSelector(store => store.confirmLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        if ( store.confirmLogin ) {
            setConfirmLogin(store.confirmLogin.isLogin);
        }
    }, [store.confirmLogin]);

    const _logout = useCallback(async() => {
        const res = await axios.get('/api/logout');

        if (res.data === true) {
            console.log("로그아웃되었습니다.");
            dispatch(actions.updateConfirmLogin({}));
        } else {
            console.log(res);
        }
    }, [dispatch]);

    //console.log("sessionStorage : ", window.sessionStorage.getItem('loginUser'), window.sessionStorage.length);

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
                    ( confirmLogin === true ) ? 
                        <Link to="/" onClick={_logout} className="button fit">Logout</Link> : 
                        <Link to="/Login" className="button fit">Login</Link>
                }
            </li>
            </ul>
            </div>
        </nav>
    )
}

export default Menu;