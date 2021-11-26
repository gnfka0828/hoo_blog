import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Banner = () => {
    const store = useSelector(store => store.confirmLogin);
    const isLogin = store && store.confirmLogin && ( store.confirmLogin.isLogin );

    return (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>Hi, my name is {(store.confirmLogin && ( store.confirmLogin.isLogin === true ) ) ? store.confirmLogin.userID : 'Unknown'}</h1>
                </header>
                <div className="content">
                    {
                        isLogin ? 
                        <>
                            <ul className="actions">
                                <li><a href="#bannerend" className="button next scrolly">Go to Article</a></li>
                            </ul>
                            <ul className="actions">
                                {/* <li><a href="landing.html" className="button next scrolly">Go to Blog</a></li> */}
                                <Link to="/Blog" className="button fit next scrolly">Go to Blog</Link>
                            </ul>
                        </> :
                        <>
                            <h3>Who are you...? Please login.</h3>
                        </>
                    }
                </div>
            </div>
        </section>
    )
}

export default Banner;