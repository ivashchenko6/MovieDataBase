import { Link } from "react-router-dom";

import './searchMainPage.scss';
const SearchMainPage = ({setCurrentItemForSearch}) => {



    return (
        <main className="choose-block">
            <div className="choose-block__wrapper">
                <Link className="choice-item" to={`persons`} onClick={() => setCurrentItemForSearch('persons')}>Find Person</Link>
                <Link className="choice-item" to={`movies`} onClick={() => setCurrentItemForSearch('movies')}>Find Movie</Link>
            </div>
            <h4 className="choose-block__description">select what you want to search</h4>

        </main>
    )
}


export default SearchMainPage;