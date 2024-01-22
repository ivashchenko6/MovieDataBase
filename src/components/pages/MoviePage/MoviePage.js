import { Link, useParams } from 'react-router-dom';
import starIcon from './star.png';
import { useEffect, useState } from 'react';
import RequestService from '../../../services/RequestService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import './moviePage.scss';
import ReviewItem from '../../reviewItem/ReviewItem';
import InfoLineItem from '../../infoLineItem/InfoLineItem';
import ExpandableText from '../../expandableText/ExpandableText';
import { modifyDate } from '../../../services/functions';
const MoviePage = () => {
    const {movieId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getDataById} = RequestService();
    
    useEffect(() => {
        updateData();
    }, [movieId])

    const updateData = async () => {
        clearError();
        await getDataById(movieId, 'movie')
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
    console.log(`Data`, data)
    const {
        adult, 
        genres, //Жанры
        runtime, //Длительность фильма
        title,   
        original_title,
        overview, 
        poster_path, 
        release_date, 
        vote_average, 
        original_language, 
        vote_count, 
        reviews
        } = data;
    
    let genresNames = genres.map(item => item.name).join(' / ').split(' ');//['Animation', '/', 'Family']
    
    const reviewsItems = reviews.results.map((review, i) => {
        return <ReviewItem key={i} review={review}/>
    })

    const genresItems = genresNames.map((item, i) => {

        if(item === '/') {
            return <li key={i}><span className="divider">{` ${item} `}</span></li>
        }
        return <li key={i} className="genre-item"><Link to={`/genres/${item.toLowerCase()}`}>{item}</Link></li>;

    });
    const releaseInfo = modifyDate(release_date).readyString;

    return (
        <div className="movie-page__wrapper">
            <div className="movie-page__header">
                <h1 className="movie-page__title">{title + ` (${release_date.slice(0,4)})`}</h1>

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
                    <InfoLineItem classesName={`release-date`} title="Release Date" content={releaseInfo}/>
                    
                    <div className="mt-10 genre-wrapper">
                        <span className="info-mark">Genres: </span> 
                        <ul className="genres-list">
                            {genresItems}
                        </ul>
                    </div>
                    
                    <InfoLineItem classesName={`mt-10 original-title`} title="Original Title" content={original_title}/>
                
                    <InfoLineItem classesName={`mt-10 original-language`} title="Original Language" content={original_language.toUpperCase()}/>
                    
                    <InfoLineItem classesName={`mt-10 vote-count`} title="Vote Count" content={vote_count}/>
                    
                    <InfoLineItem classesName={`mt-10 movie-duration`} title="Duration" content={runtime + ` min.`}/>

                    
                    
                </div>
            </div>
            
            <div className="mt-10 description">
                {overview}
                
                
            </div>


            <ul className="movie-page__reviews-container">
                {
                    reviewsItems
                }
            </ul>
        </div>
    )
}

export default MoviePage;