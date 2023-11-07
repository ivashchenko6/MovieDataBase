import { Link } from 'react-router-dom';
import './personItem.scss';
const PersonItem = ({item}) => {
    
    //TODO: Сделать карточку для каждого Человека
    const {adult, gender, id, known_for, known_for_department, name, original_name, popularity, profile_path} = item;

    const knownMoviesOfPerson = known_for.map(item => {
        return <Link key={item.id} to={`/search/movies/${item.id}`} className="known-for__item">{item.title}</Link>
    });
    
    return (
        <li className="person-item">
            <h3 className="person-item__name">{name}</h3>

            <div className="person-item__wrapper">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt={name} className="person__image"/>

                <div className="person-item__wrapper-information">
                    <div className="person-item__information">
                        <div className="person__gender"><span className="fz20">Gender:</span> {gender === 1 ? 'Female' : 'Male'}</div>
                        <div className="person__known-movies-wrapper">
                            <span className="fz20">Known Movies: </span>
                            <div className="person__known-movies">
                                {knownMoviesOfPerson}
                            </div>
                        </div>
                        <div className="person__original-name">
                            <span className="fz20">Original Name: </span>{original_name}
                        </div>

                        <div className="person__popularity">
                            <span className="fz20">Popularity: </span>{popularity.toFixed(1)}
                        </div>

                        <div className="person__known-department">
                            <span className="fz20">Popular Genre: </span>{known_for_department}
                        </div>
                    </div>

                    <Link to={`${id}`} className="person__btn-about">ABOUT</Link>
                </div>


                
            </div>
            
        </li>
    )
};

export default PersonItem;