import avatar from './avatar.png';
import './reviewItem.scss';
import { modifyDate, checkingTextLength } from '../../services/functions';
import ExpandableText from '../expandableText/ExpandableText';



const ReviewItem = ({review}) => {
    
    console.log(review);
    const {author, author_details : {name, username, avatar_path, rating}, content, id, url} = review;
    const timeInformation = review.created_at.split('T'); //['2024-01-09', '13:50:55.111Z']
    const dateInformation = modifyDate(timeInformation[0], timeInformation[1].slice(0, 8));
    return (
        <li className="review-item">
            <div className="review-item__avatar-wrapper">
                <img src={avatar_path !== null ? `https://www.themoviedb.org/t/p/w64_and_h64_face${avatar_path}` : avatar  } className="review-item__avatar"/>
            </div>
            
            <div className="review-item__container">
                <div className="review-item__information">
                    <span className="review-item__name">{username}</span>
                    <span className="divider">{` | `}</span>
                    <span className="review-item__date">{`${dateInformation.month} ${dateInformation.day} ${dateInformation.year} ${dateInformation.hours}:${dateInformation.minutes}`}</span>
                    
                </div>
                <div className="review-item__content">
                    
                    {<ExpandableText text={content} maxSymbols={500} />}
                </div>
            </div>
        </li>
    )
}

export default ReviewItem;