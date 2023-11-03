import FilmItem from "../filmItem/FilmItem"

import './moviesList.scss';
const MoviesList = ({moviesList}) => {
    const items = moviesList.map((item, i) => {
        return <FilmItem key={i} movie={item}/>
    })
    return (
        <ul className="movies-list">
            {items}
        </ul>
    )
}

export default MoviesList