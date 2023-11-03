import { useState, useEffect, memo } from 'react';
import RequestService from '../../services/RequestService';

import Spinner from '../spinner/Spinner';
import './dataList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import FilmItem from '../filmItem/FilmItem';

const DataList = memo(() => {
    

    const {loading, error, clearError, getPopularMovies} = RequestService();

    const [moviesList, setMoviesList] = useState([]);
    
    useEffect(() => {
        clearError();
        getPopularMovies()
            .then(onMoviesListLoaded);
        

        
    }, []);

    
    
    const onMoviesListLoaded = (movies) => setMoviesList(movies);



    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading && error) ? moviesList.map(movie => {
        return <FilmItem movie={movie} key={movie.id}/>
    }) : null

    return (
        
        <main className="movies">
            <ul className="movies__list">
                {spinner}
                {errorMessage}
                {content}
            </ul>
            

        </main>
    )
})

export default DataList;