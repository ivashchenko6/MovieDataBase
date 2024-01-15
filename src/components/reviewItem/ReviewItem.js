import avatar from './avatar.png';
import './reviewItem.scss';

function checkingTextLength(text) {
    return text.length > 588 ? `${text.slice(0, 588)}...` : text.slice(0, 588);
}

function modifyDate(date, time) {
    let [year, month, day] = date.split('-'); //['2024', '01', '12']  //Year Month 
    let [hours, minutes] = time.split(':');
    switch(month) {
        case '01':
            month = 'January';
            break;
        case '02':
            month = 'February';
            break;
        case '03':
            month = 'March';
            break;
        case '04':
            month = 'April';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'June';
            break;
        
        case '07':
            month = 'July';
            break;
        case '08':
            month = 'August';
            break;
        case '09':
            month = 'September';
            break;
        case '10':
            month = 'October';
            break;
        case '11':
            month = 'November';
            break;
        case '12':
            month = 'December';
            break;
        default:
            
    }
    return `${month} ${day} ${year} ${hours}:${minutes}`
}


const ReviewItem = ({review}) => {
    //TODO: Реализовать работу комментариев под фильмов, оформить визуальную составляющую каждого комментария
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
                    <span className="review-item__date">{dateInformation}</span>
                    
                </div>
                <div className="review-item__content">
                    
                    {checkingTextLength(content)}
                </div>
            </div>
        </li>
    )
}

export default ReviewItem;