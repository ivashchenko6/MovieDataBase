import DataList from "../../dataList/DataList"
import MoviesList from "../../moviesListByName/MoviesList";

const SearchMoviePage = ({foundMoviesList}) => {
    
    const content = foundMoviesList.length === 0 ? <DataList /> : <MoviesList moviesList={foundMoviesList}/>;
    return (
        <div className="main-page__wrapper">
            {content}
            
        </div>
    )
}

export default SearchMoviePage;