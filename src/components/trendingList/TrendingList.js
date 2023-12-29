import { useState, useEffect, memo } from 'react';
import RequestService from '../../services/RequestService';

import Spinner from '../spinner/Spinner';
import './trendingList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';

const TrendingList = ({type, Component}) => {
    
    
    const {loading, error, clearError, getTrendingMovies, getTrendingPeople} = RequestService();
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
            {type === 'persons' ? <SelectSort setTimeWindow={setTimeWindow}/>: null}
            
            <ul className="movies__list">
                {spinner}
                {errorMessage}
                {content}
            </ul>
            

        </main>
    )
}
// const TrendingList = memo(({type, Component}) => {
    

//     const {loading, error, clearError, getPopularMovies, getTrendingPeople} = RequestService();
//     const [timeWindow, setTimeWindow] = useState('week');
//     const [trendingList, setTrendingList] = useState([]);
    
//     useEffect(() => {
//         clearError();
//         if(type === 'movies') {
//             updateTrendingMovies();
//         } else if (type === 'persons') {

//             updateTrendingPeople();
//         }
//     }, []);

//     useEffect(() => {
//         if(timeWindow !== '') {
//             updateTrendingPeople(timeWindow);
//         }
//     }, [timeWindow])


//     useEffect(() => {
//         console.log(`Updated`, trendingList)
//     }, [trendingList])

//     const updateTrendingMovies = async () => {
//         await getPopularMovies()
//                 .then(onTrendingListLoaded)
//     }
    
//     const updateTrendingPeople = async () => {
//         await getTrendingPeople(timeWindow)
//                 .then(res => onTrendingListLoaded(res.results));
//     }
//     const onTrendingListLoaded = async (data) => await setTrendingList(data);
//     const spinner = loading ? <Spinner/> : null;
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const content = !(loading || error || (trendingList.length !== 0)) ? trendingList.map(item => {
//         console.log(item)
//         // return <Component item={item} key={item.id}/>
//     }) : null;
    
//     return (

//         <main className="movies">
//             {type === 'persons' ? <SelectSort setTimeWindow={setTimeWindow}/>: null}
            
//             <ul className="movies__list">
//                 {spinner}
//                 {errorMessage}
//                 {content}
//             </ul>
            

//         </main>
//     )
// });

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