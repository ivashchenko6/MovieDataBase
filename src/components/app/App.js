import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from '../header/Header';
import GreetingPage from '../pages/GreetingPage/SearchMainPage';

import Page404 from '../pages/Page404/Page404';


import movieContext from '../context';

import RequestService from '../../services/RequestService';
import SearchMainPage from '../pages/SearchMainPage/SearchMainPage';
import SearchDataPage from '../pages/SearchDataPage/SearchDataPage';
import PersonItem from '../personItem/PersonItem';
import MovieItem from '../movieItem/MovieItem';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SingleMovieLayout from '../pages/SingleMovieLayout/SingleMovieLayout';
import SinglePersonLayout from '../pages/SinglePersonLayout/SinglePersonLayout';
import './app.scss';
const {Provider} = movieContext

const App = () => {
    const [movie, setMovie] = useState('');
    const [currentMoviesByName, setCurrentMoviesByName] = useState([]);
    
    const {getMovieByName} = RequestService();


    const onFindMovie = async () => { //Request for movie
        await getMovieByName(movie)
            .then(setCurrentMoviesByName);
    }

    const clearFoundedMovies = () => {
        setMovie('');
        setCurrentMoviesByName([]);
    }
    
    //TODO: Need to fix search problem 

    const setMovieName = (e) => setMovie(e.target.value);
    
    return (    
        <div className="app">
            <ErrorBoundary>
                <Provider value={{movie, setMovieName, onFindMovie}}>
                    <Router>

                            <Header clearFoundedMovies={clearFoundedMovies}/> {/* Верхняя шапка и input для поиска*/}
                            <Routes>
                                
                                <Route path="/" element={<GreetingPage/>}/> {/*Страница Приветствия*/}
                                
                                <Route path="/search" element={<SearchMainPage/>}/> {/* Выбор что мы будем искать Person or Movie */}


                                <Route path="/search/movies" 
                                        element={<SearchDataPage 
                                                    type='movies' 
                                                    currentMoviesByName={currentMoviesByName} 
                                                    Component={MovieItem}/>
                                        }
                                />
                                
                                <Route path="/search/persons" 
                                        element={<SearchDataPage 
                                                    type='persons' 
                                                    currentMoviesByName={currentMoviesByName} 
                                                    Component={PersonItem}/>
                                        } 
                                />
                                

                                <Route path="/search/movies/:movieId" 
                                        element={<SingleMovieLayout/>}
                                />
                                
                                <Route path="/search/persons/:personId"
                                        element={<SinglePersonLayout/>}
                                />

                                        

                                        
                                
                                {/* <Route path="/search/movies/:id" 
                                    element={<SinglePage 
                                                Component={SingleMovieLayout} 
                                                currentSearch="movie"/>
                                    }
                                />
                                
                                <Route path="/search/persons/:id"
                                        element={<SinglePage
                                                    Component={SinglePersonLayout}
                                                    currentSearch="person"/>
                                        }
                                /> */}
                                
                                
                                

                                <Route path="*" element={<Page404/>}/> {/* Страница Ошибки */}
                            </Routes>
                    </Router>
                </Provider>
            </ErrorBoundary>
            
        </div>
        
    )
}
export default App;