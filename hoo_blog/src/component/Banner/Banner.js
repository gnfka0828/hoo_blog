import { useSelector } from "react-redux";

const Banner = () => {
    const store = useSelector(store => store.confirmLogin);

    return (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>Hi, my name is {(store.confirmLogin && ( store.confirmLogin.isLogin === true ) ) ? store.confirmLogin.userID : 'Unknown'}</h1>
                </header>
                <div className="content">
                    {/* <p>BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi BBongdong♥Mandugi </p> */}
                    <ul className="actions">
                        <li><a href="#bannerend" className="button next scrolly">Go to Article</a></li>
                    </ul>
                    <ul className="actions">
                        <li><a href="landing.html" className="button next scrolly">Go to Blog</a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Banner;