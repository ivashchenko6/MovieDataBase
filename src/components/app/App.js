import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import Header from '../header/Header';

import GreetingPage from '../pages/GreetingPage/SearchMainPage';

import Page404 from '../pages/Page404/Page404';

import './app.scss';
import SearchMoviePage from '../pages/SearchMoviePage/SearchMoviePage';
import movieContext from '../context';
import MoviePage from '../pages/MoviePage/MoviePage';
import FindPage from '../pages/SearchMainPage/SearchMainPage';
import RequestService from '../../services/RequestService';
import SearchMainPage from '../pages/SearchMainPage/SearchMainPage';


const {Provider} = movieContext

const App = () => {
    const [movie, setMovie] = useState('');
    const [currentMovieByName, setCurrentMovieByName] = useState([]);
    
    const {getMovieByName} = RequestService();


    const onFindMovie = async () => { //Request for movie
        await getMovieByName(movie)
            .then(setCurrentMovieByName)
    }
    const clearFoundedMovies = () => {
        setMovie('');
        setCurrentMovieByName([]);
    }

    const setMovieName = (e) => setMovie(e.target.value)
    return (    
        <div className="app">
            <Provider value={{movie, setMovieName, onFindMovie}}>
                <Router>

                        <Header clearFoundedMovies={clearFoundedMovies}/>
                        <Routes>
                            <Route path="/" element={<GreetingPage/>}/> 
                            <Route path="/search" element={<SearchMainPage/>}/>
                            <Route path="/search/movies" element={<SearchMoviePage foundMoviesList={currentMovieByName}/>}/>
                            {/* <Route path="/search/persons" element={<SearchPersonPage />} /> */}
                            <Route path="/search/movies/:id" element={<MoviePage/>}/>
                            
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                </Router>
            </Provider>
        </div>
        
    )
}
export default App;