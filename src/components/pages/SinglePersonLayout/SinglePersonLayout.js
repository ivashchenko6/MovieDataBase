import { Link } from 'react-router-dom';
import starIcon from './star.png';
const SinglePersonLayout = ({data}) => {
    
    return <h1>Person Layout</h1>
    // const {adult, original_title, overview, poster_path, release_date, vote_average, genres_list, original_language, vote_count} = data;
    
    // let genresNames = genres_list.map(item => item.name).join(' / ').split(' ');//['Animation', '/', 'Family']
    
    // const genresItems = genresNames.map((item, i) => {
    //     if(item === '/') {
    //         return <span className="divider" key={i}>{` ${item} `}</span>
    //     } else {
    //         return <Link key={i} to={`/genres/${item.toLowerCase()}`} className="genre-wrapper__item">{item}</Link>
    //     }
    // });
    
    // return (
    //     <div className="movie-page__wrapper">
    //         <div className="movie-page__header">
    //             <h1 className="movie-page__title">{original_title + ` (${release_date.slice(0,4)})`}</h1>

    //             <div className="movie-page__movie-mark">
    //                 {vote_average.toFixed(1)}
    //                 <img src={starIcon} alt='star'className="star-icon"/>
    //                 /10
    //                 <img src={starIcon} alt='star'className="star-icon"/>
    //             </div>
    //         </div>
    //         <div className="movie-page__container">
    //             <div className="movie-page__poster-wrapper">
    //                 <div className="adult-box" style={{'visibility': adult ? 'visible' : 'hidden'}}>18+</div>
    //                 <img src={`https://www.themoviedb.org/t/p/original${poster_path}`} alt={original_title.toLowerCase()}/>

    //             </div>

    //             <div className="movie-page__information">
    //                 <div className="release-date"><span className="info-mark">Release Date: </span><span className="information-item">{release_date}</span> </div>
    //                 <div className="mt-10 genre-wrapper">
    //                     <span className="info-mark">Genres: </span> {genresItems}
    //                 </div>
    //                 <div className="mt-10 original-title"><span className="info-mark">Original Title: </span><span className="information-item">{original_title}</span></div>
    //                 <div className="mt-10 original-language"><span className="info-mark">Original Language: </span><span className="information-item">{original_language.toUpperCase()}</span></div>
    //                 <div className="mt-10 vote-count"><span className="info-mark">Vote Count: </span><span className="information-item">{vote_count}</span></div>
    //             </div>
    //         </div>
    //         <div className="desription">{overview}</div>
    //     </div>
    // )
    
}

export default SinglePersonLayout;