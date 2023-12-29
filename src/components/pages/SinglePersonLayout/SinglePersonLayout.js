import { Link } from 'react-router-dom';
import starIcon from './star.png';
import './singlePersonLayout.scss';
const SinglePersonLayout = ({data}) => {
    
    
    console.log(data)
    const {adult, gender, id, known_for, known_for_department, name, original_name, popularity, profile_path} = data;
    
    const knownMoviesOfPerson = known_for.map(item => {
        return <Link key={item.id} to={`/search/movies/${item.id}`} className="known-for__item">{item.title}</Link>
    });

    return (
        <div className="person-page__wrapper">
            <h1 className="person-page__name">{name}</h1>

            <div className="person-page__wrapper">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt={name} className="person__image"/>

                <div className="person-page__wrapper-information">
                    <div className="person-page__information">
                        <div className="person-page__gender"><span className="fz20">Gender:</span> {gender === 1 ? 'Female' : 'Male'}</div>
                        <div className="person-page__known-movies-wrapper">
                            <span className="fz20">Known Movies: </span>
                            <div className="person__known-movies">
                                {knownMoviesOfPerson}
                            </div>
                        </div>
                        <div className="person-page__original-name">
                            <span className="fz20">Original Name: </span>{original_name}
                        </div>

                        <div className="person-page__popularity">
                            <span className="fz20">Popularity: </span>{popularity.toFixed(1)}
                        </div>

                        <div className="person-page__known-department">
                            <span className="fz20">Popular Genre: </span>{known_for_department}
                        </div>
                    </div>
                </div>


                
            </div>
        </div>
    )
    
}

export default SinglePersonLayout;