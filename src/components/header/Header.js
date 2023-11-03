import {Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import houseIcon from '../../resources/img/home.png';

import './header.scss';
import SearchPanel from '../SearchPanel/SearchPanel';

const Header = ({clearFoundedMovies}) => {
    let location = useLocation(); //url path
    const [isHomepage, setIsHomepage] = useState(true);

    useEffect(() => {
        setIsHomepage(!(location.pathname === '/search/movies' || location.pathname === '/search/movies'));
        
    }, [location]);

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Link to='/' onClick={clearFoundedMovies}>
                        <img src={houseIcon} alt="home" className='header__img'/>
                    </Link>

                    <h1 className="header__title">LoveToMovie</h1>
                </div>

                <p className="header__description">
                    find your favorite movie
                </p>

                {
                    isHomepage ? (
                        <Link to='search' className="header__btn">
                            find
                        </Link>) : <SearchPanel/>
                    
                }
                
                
            </div>
        </header>
    )
}
export default Header;