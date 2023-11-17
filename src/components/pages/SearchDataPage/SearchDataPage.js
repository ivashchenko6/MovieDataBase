import MoviesListByName from "../../moviesListByName/MoviesListByName";
import TrendingList from "../../trendingList/TrendingList";

const SearchDataPage = ({ type, foundDataList, Component }) => {
    
    const content = foundDataList.length === 0 ? <TrendingList type={type} Component={Component}/> : <MoviesListByName moviesList={foundDataList}/>;
    return (
        <div className="main-page__wrapper">
            {content}
            
        </div>
    )
}

export default SearchDataPage;