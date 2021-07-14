const Article = (props) => {
    const {title, contents, backgroundImageSrc} = props;

    if ( ! props ) {
        return;
    }

    return (
        <article>
            <span className="image">
                <a href="landing.html"><img src={backgroundImageSrc} alt="" /></a>
            </span>
            <header className="major">
                <h3><a href="landing.html" className="link">{title}</a></h3>
                <p>{contents}</p>
            </header>
        </article>
    )
}

export default Article;