import { Link, useParams } from 'react-router-dom';
import starIcon from './star.png';
import { useEffect, useState } from 'react';
import RequestService from '../../../services/RequestService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import './singleMovieLayout.scss';
import ReviewItem from '../../reviewItem/ReviewItem';
const SingleMovieLayout = () => {
    const {movieId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getDataById, getExternalId, getMovieReviews} = RequestService();
    

    useEffect(() => {
        updateData();
    }, [movieId])
    
    useEffect(() => {
        console.log(`Data`, data)
    }, [data])

    const updateData = async () => {
        clearError();
        await getDataById(movieId, 'imdb_id', 'movie')
            .then(onDataLoaded)
    }

    const onDataLoaded = (data) => setData(data);

    
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <View key={movieId} data={data}/> : null
    
    return (
        <>
            {spinner}
            {errorMessage}
            {  
                content
            }
        </>
    )
    
    
    
    
    
}


const View = ({data}) => {
    
    const {adult, original_title, overview, poster_path, release_date, vote_average, genres_list, original_language, vote_count, reviews} = data;
    
    let genresNames = genres_list.map(item => item.name).join(' / ').split(' ');//['Animation', '/', 'Family']
    
    const reviewsItems = reviews.results.map((review, i) => {
        return <ReviewItem key={i} review={review}/>
    })

    const genresItems = genresNames.map((item, i) => {
        if(item === '/') {
            return <span className="divider" key={i}>{` ${item} `}</span>
        } else {
            return <Link key={i} to={`/genres/${item.toLowerCase()}`} className="genre-wrapper__item">{item}</Link>
        }
    });

    return (
        <div className="movie-page__wrapper">
            <div className="movie-page__header">
                <h1 className="movie-page__title">{original_title + ` (${release_date.slice(0,4)})`}</h1>

                <div className="movie-page__movie-mark">
                    {vote_average.toFixed(1)}
                    <img src={starIcon} alt='star'className="star-icon"/>
                    /10
                    <img src={starIcon} alt='star'className="star-icon"/>
                </div>
            </div>
            <div className="movie-page__container">
                <div className="movie-page__poster-wrapper">
                    <div className="adult-box" style={{'visibility': adult ? 'visible' : 'hidden'}}>18+</div>
                    <img src={`https://www.themoviedb.org/t/p/original${poster_path}`} alt={original_title.toLowerCase()}/>

                </div>

                <div className="movie-page__information">
                    <div className="release-date"><span className="info-mark">Release Date: </span><span className="information-item">{release_date}</span> </div>
                    <div className="mt-10 genre-wrapper">
                        <span className="info-mark">Genres: </span> {genresItems}
                    </div>
                    <div className="mt-10 original-title"><span className="info-mark">Original Title: </span><span className="information-item">{original_title}</span></div>
                    <div className="mt-10 original-language"><span className="info-mark">Original Language: </span><span className="information-item">{original_language.toUpperCase()}</span></div>
                    <div className="mt-10 vote-count"><span className="info-mark">Vote Count: </span><span className="information-item">{vote_count}</span></div>
                </div>
            </div>
            <div className="desription">{overview}</div>


            <ul className="movie-page__reviews-container">
                {reviewsItems}
            </ul>
        </div>
    )
}

export default SingleMovieLayout;