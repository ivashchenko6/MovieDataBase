import MoviesListByName from "../../moviesListByName/MoviesListByName";
import TrendingList from "../../trendingList/TrendingList";

const SearchDataPage = ({ type, currentMoviesByName, Component }) => {
    
    const content = currentMoviesByName.length === 0 ? <TrendingList type={type} Component={Component}/> : <MoviesListByName moviesList={currentMoviesByName}/>;
    
    return (
        <div className="main-page__wrapper">
            {
                content
            }
            
        </div>
    )
}

export default SearchDataPage;