import { useState, useEffect, memo } from 'react';
import RequestService from '../../services/RequestService';

import Spinner from '../spinner/Spinner';

import ErrorMessage from '../errorMessage/ErrorMessage';
import './trendingList.scss';
const TrendingList = ({type, Component}) => {
    
    
    const {loading, error, clearError, getTrendingMovies, getTrendingPeople} = RequestService();
    const [timeWindow, setTimeWindow] = useState('day');
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
        if(timeWindow !== '' && type === 'persons') {
            updateTrendingPeople(timeWindow);
        }
    }, [timeWindow])



    const updateTrendingMovies = async () => {
        await getTrendingMovies()
                .then(onTrendingListLoaded)
    }
    
    const updateTrendingPeople = async () => {
        await getTrendingPeople(timeWindow)
                .then(res => onTrendingListLoaded(res.results));
    }
    const onTrendingListLoaded = (data) => setTrendingList(data);



    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !trendingList) ? trendingList.map(item => {
        
        return <Component item={item} key={item.id}/>
    }) : null;
    
    return (

        <main className="movies">
            {type === 'persons' ? <SelectSort setTimeWindow={setTimeWindow} currentTimeWindow={timeWindow}/>: null}
            
            <ul className="movies__list">
                {spinner}
                {errorMessage}
                {content}
            </ul>
            

        </main>
    )
}


const SelectSort = ({setTimeWindow, currentTimeWindow}) => {
    return (
        <div className="sort-persons">
            <label htmlFor="time-window">Sort By:</label>
            <select name="time-window" onChange={e => setTimeWindow(e.target.value)}>
                <option value="day" className={currentTimeWindow === "week" ? "shown" : "hidden"}>Day</option>
                <option value="week" className={currentTimeWindow ==="day" ? "shown" : "hidden"}>Week</option>
            </select>
        </div>
    )
}

export default TrendingList;