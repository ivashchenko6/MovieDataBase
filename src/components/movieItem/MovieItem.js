import { Link } from 'react-router-dom'

import './movieItem.scss';
import { useEffect, useState } from 'react';

const MovieItem = ({item}) => {
    
    const [movieItem, setMovieItem] = useState({});

    
    
    useEffect(() => {
        setMovieItem(item);
    }, [])

    useEffect(() => {
        if(item !== undefined) {
            setMovieItem(item);
        }
    }, [item])

    
    useEffect(() => {
        console.log('Current', movieItem);
    }, [movieItem])
    const {title, vote_average, poster_path, release_date, adult, overview, id} = item
    
    return (
        <li className="movie__item">
            <div className="movie__title-wrapper">
                <h3 className='movie__title'>{title}</h3>
                <div className="movie__average-rating">
                    <span>{vote_average.toFixed(1)}</span>/10
                </div>
            </div>
            
            <div className="movie__wrapper">
                <img src={`https://www.themoviedb.org/t/p/original${poster_path}`} alt={title} className="movie__poster"/>

                <div className="movie__information-wrapper">
                    <div className="movie__information">
                        <div className="movie__release-date">
                            <span>Release Date</span>: {release_date}
                        </div>
                        <div className='movie__age-restrictions'>
                            <span>Age Restrictions</span>: {adult ? '18+' : 'no restrictions'}
                        </div>

                        <div className='movie__description'>
                            <span>Description</span>: {overview}
                        </div>
                    </div>
                    <Link to={`${id}`} className="movie__btn-about">WATCH</Link>
                </div>
                

            </div>
            
            
        </li>
    )


    
}
export default MovieItem;