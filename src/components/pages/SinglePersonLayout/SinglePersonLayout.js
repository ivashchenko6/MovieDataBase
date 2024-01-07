import { Link, useParams } from 'react-router-dom';
import './singlePersonLayout.scss';
import { useEffect, useState } from 'react';
import RequestService from '../../../services/RequestService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
const SinglePersonLayout = () => {

    const {personId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getDataById, getExternalId} = RequestService();
    
    useEffect(() => {
        updateData();
    }, [personId])
    
    const updateData = async () => {
        clearError();
        await getExternalId(personId, "person")
            .then(externalId => getDataById(externalId.imdb_id, 'imdb_id', "person") )
            .then(data => onDataLoaded(data[`${"person"}_results`][0]));
    }

    const onDataLoaded = (data) => setData(data);

    
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <View data={data}/> : null
    
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
    const {adult, gender, id, known_for, known_for_department, name, original_name, popularity, profile_path} = data;
    const knownMoviesOfPerson = known_for.map((item, i ) => {
        
        return <li><Link key={item.id + i} to={`/search/movies/${item.id}`} className="known-for__item">{item.title}</Link></li>
    });
    return (
        <div className="person-page__block">
            <h1 className="person-page__name">{name}</h1>

            <div className="person-page__wrapper">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt={name} className="person__image"/>

                <div className="person-page__wrapper-information">
                    <div className="person-page__information">
                        <div className="person-page__gender">
                            <span className="fz20 info-mark">Gender:</span> <span className='information-item'>{gender === 1 ? 'Female' : 'Male'}</span>
                        </div>
                        
                        <div className="person-page__known-movies-wrapper">
                            <span className="fz20 info-mark">Known Movies: </span>
                            <ul className="person__known-movies">
                                {knownMoviesOfPerson}
                            </ul>
                        </div>
                        <div className="person-page__original-name">
                            <span className="fz20 info-mark">Original Name: </span><span className='information-item'>{original_name}</span>
                        </div>

                        <div className="person-page__popularity">
                            <span className="fz20 info-mark">Popularity: </span><span className='information-item'>{popularity.toFixed(1)}</span>
                        </div>

                        <div className="person-page__known-department">
                            <span className="fz20 info-mark">Popular Genre: </span><span className='information-item'>{known_for_department}</span>
                        </div>
                    </div>
                </div>


                
            </div>
        </div>
    )
}

export default SinglePersonLayout;