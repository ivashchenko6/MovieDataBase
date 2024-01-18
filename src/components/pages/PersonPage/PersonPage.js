import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RequestService from '../../../services/RequestService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import './personPage.scss';
import InfoLineItem from '../../infoLineItem/InfoLineItem';
const PersonPage = () => {

    const {personId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getDataById} = RequestService();
    
    useEffect(() => {
        updateData();
    }, [personId])
    
    const updateData = async () => {
        clearError();
        await getDataById(personId, "person")
            .then(onDataLoaded);
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

    console.log(data);
    const {biography, birthday, place_of_birth,  gender, id, known_for, known_for_department, name, popularity, profile_path} = data;
    const knownMoviesOfPerson = known_for.map((item) => {
        return <li key={item.id}><Link to={`/search/movies/${item.id}`} className="known-for__item">{item.title}</Link></li>
    });

    return (
        <div className="person-page__block">
            <h1 className="person-page__name">{name}</h1>

            <div className="person-page__wrapper">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt={name} className="person__image"/>

                <div className="person-page__wrapper-information">
                    <div className="person-page__information">

                        <InfoLineItem classesName="person-page__gender" title="Gender" content={gender === 1 ? 'Female' : 'Male'}/>

                        <div className="person-page__known-movies-wrapper">
                            <span className="fz20 info-mark">Known Movies: </span>
                            <ul className="person__known-movies">
                                { knownMoviesOfPerson}
                            </ul>
                        </div>
                        
                        <InfoLineItem classesName="person-page__birthday" title="Date and place of birth" content={birthday}/>

                        <InfoLineItem classesName="person-page__popularity" title="Popularity" content={popularity.toFixed(1)}/>
                        
                        <InfoLineItem classesName="person-page__known-department" title="Popular Genre" content={known_for_department}/>
                        
                    </div>
                </div>


                
            </div>
        </div>
    )
}

export default PersonPage;