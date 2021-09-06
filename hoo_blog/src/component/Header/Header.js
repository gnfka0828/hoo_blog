// import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="header" className="alt">
            {/* <a href="index.html" className="logo"><strong>Hoolog</strong> <span>by hooram.seo</span></a> */}
            <div className="logo"><strong>Hoolog</strong> <span>by Unknown</span></div>
            {/* <Link to="/" className="logo"><strong>Hoolog</strong> <span>by hooram.seo</span></Link> */}
            <nav>
                <a href="#menu">Menu</a>
            </nav>
        </header>
    )
}

export default Header;