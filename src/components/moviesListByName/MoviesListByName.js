import MovieItem from "../movieItem/MovieItem"

import './moviesList.scss';
const MoviesListByName = ({moviesList}) => {
    const items = moviesList.map((item, i) => {
        return <MovieItem key={i} movie={item}/>
    })
    return (
        <ul className="movies-list">
            {items}
        </ul>
    )
}

export default MoviesListByName;