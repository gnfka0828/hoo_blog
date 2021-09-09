// import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {
    const store = useSelector(store => store.confirmLogin);

    return (
        <header id="header" className="alt">
            {/* <a href="index.html" className="logo"><strong>Hoolog</strong> <span>by hooram.seo</span></a> */}
            <div className="logo">
                <strong>Hoolog</strong> 
                <span> by {(store.confirmLogin && ( store.confirmLogin.isLogin === true ) ) ? store.confirmLogin.userID : 'Unknown'}</span>
            </div>
            {/* <Link to="/" className="logo"><strong>Hoolog</strong> <span>by hooram.seo</span></Link> */}
            <nav>
                <a href="#menu">Menu</a>
            </nav>
        </header>
    )
}

export default Header;