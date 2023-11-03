import { Link } from 'react-router-dom'

import './filmItem.scss';

const FilmItem = ({movie}) => {
    const {adult, id, title, overview, poster_path, vote_average, release_date} = movie
    return (
        <li className="film__item">
            <div className="film__title-wrapper">
                <h3 className='film__title'>{title}</h3>
                <div className="film__average-rating">
                    <span>{vote_average.toFixed(1)}</span>/10
                </div>
            </div>
            
            <div className="film__wrapper">
                <img src={`https://www.themoviedb.org/t/p/original` + poster_path} alt="poster" className="film__poster"/>

                <div className="film__information-wrapper">
                    <div className="film__information">
                        <div className="film__release-date">
                            <span>Release Date</span>: {release_date}
                        </div>
                        <div className='film__age-restrictions'>
                            <span>Age Restrictions</span>: {adult ? '18+' : 'no restrictions'}
                        </div>

                        <div className='film__description'>
                            <span>Description</span>: {overview}
                        </div>
                    </div>
                    <Link to={`${id}`} className="film__btn-about">WATCH</Link>
                </div>
                

            </div>
            
            
        </li>
    )
}
export default FilmItem