import { Link } from "react-router-dom";

import './searchMainPage.scss';
const SearchMainPage = () => {



    return (
        <main className="choose-block">
            <div className="choose-block__wrapper">
                <Link className="choice-item" to={`persons`}>Find Person</Link>
                <Link className="choice-item" to={`movies`}>Find Movie</Link>
                <Link className="choice-item" to={`genres`}>Find Genre</Link>
            </div>
            <h4 className="choose-block__description">select what you want to search</h4>

        </main>
    )
}


export default SearchMainPage;