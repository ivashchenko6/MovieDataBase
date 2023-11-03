


import './greetingPage.scss';
const GreetingPage = () => {


    return (
        <section className="about">
            <div className="about__description">
                This application is built using <span>HTML</span>, <span>SCSS</span>, <span>React</span> and <span>TMDB API</span>
            </div>

            <div className="about__github">
                My github: <a target="_blank" href='https://github.com/ivashchenko6'>GitHub</a>
            </div>
        </section>
    )
}
export default GreetingPage;