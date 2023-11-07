import { useState, useEffect, memo } from 'react';
import RequestService from '../../services/RequestService';

import Spinner from '../spinner/Spinner';
import './trendingList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';


const TrendingList = memo(({type, Component}) => {
    

    const {loading, error, clearError, getPopularMovies, getTrendingPeople} = RequestService();
    const [timeWindow, setTimeWindow] = useState('week');
    const [trendingList, setTrendingList] = useState([]);
    
    useEffect(() => {
        clearError();
        if(type === 'movies') {
            updateTrendingMovies();
        } else if (type === 'persons') {

            updateTrendingPeople();
        }
    }, []);

    useEffect(() => {
        if(timeWindow !== '') {
            updateTrendingPeople(timeWindow);
        }
    }, [timeWindow])


    const updateTrendingMovies = async () => {
        await getPopularMovies()
                .then(onTrendingListLoaded)
    }
    
    const onTrendingListLoaded = async (data) => await setTrendingList(data);
    
    const updateTrendingPeople = async () => {
        await getTrendingPeople(timeWindow)
                .then(res => onTrendingListLoaded(res.results));
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !trendingList) ? trendingList.map(item => {
        return <Component item={item} key={item.id}/>
    }) : null

    return (

        <main className="movies">
            {type === 'persons' ? <SelectSort setTimeWindow={setTimeWindow}/>: null}
            
            <ul className="movies__list">
                {spinner}
                {errorMessage}
                {content}
            </ul>
            

        </main>
    )
});

const SelectSort = ({setTimeWindow}) => {
    return (
        <div className="sort-persons">
            <label htmlFor="time-window">Sort By:</label>
            <select name="time-window" onChange={e => setTimeWindow(e.target.value)} placeholder='Select Time Window'>
                <option value="">Select Time Window</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
            </select>
        </div>
    )
}

export default TrendingList;