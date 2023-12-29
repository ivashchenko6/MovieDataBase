import MovieItem from "../movieItem/MovieItem"

import './moviesList.scss';
const MoviesListByName = ({moviesList}) => {
    

    
    console.log(moviesList, 'MoviesList')
    const items = moviesList.map((item, i) => {
        
        return <MovieItem key={i} item={item}/>
    });
    
    return (
        <ul className="movies-list">
            {
                items
            }
        </ul>
    )
}

export default MoviesListByName;