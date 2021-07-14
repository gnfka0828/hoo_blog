import Header from './Header';
import Menu from './Menu';
import Banner from './Banner';
import {Article, PlusArticle} from './Article';
import Contact from './Contact';
import Footer from './Footer';

function Home() {
    return (
        <div id="wrapper">
            <Header />
            <Menu />
            <Banner />
            <div id="bannerend" />
            <div id="main">
                <section id="one" className="tiles">
                    <Article 
                        title={"Aliquam"}
                        contents={"Ipsum dolor sit amet"}
                        backgroundImageSrc={"images/pic01.jpg"}
                    />
                    <Article 
                        title={"Magna"}
                        contents={"Lorem etiam nullam"}
                        backgroundImageSrc={"images/pic02.jpg"}
                    />
                    <Article 
                        title={"Ipsum"}
                        contents={"Nisl sed aliquam"}
                        backgroundImageSrc={"images/pic05.jpg"}
                    />
                    {/* <Article 
                        title={"Consequat"}
                        contents={"Ipsum dolor sit amet"}
                        backgroundImageSrc={"images/pic01.jpg"}
                    />
                    <Article 
                        title={"Etiam"}
                        contents={"Feugiat amet tempus"}
                        backgroundImageSrc={"images/pic06.jpg"}
                    /> */}
                    <PlusArticle />
                </section>

                {/* <!-- Two -->
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>Massa libero</h2>
                            </header>
                            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
                            <ul className="actions">
                                <li><a href="landing.html" className="button next">Get Started</a></li>
                            </ul>
                        </div>
                    </section> */}
            </div>
            <Contact />
            <Footer />  
        </div>
    );
  }
  
export default Home;