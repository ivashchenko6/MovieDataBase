
import { useContext } from 'react';
import movieContext from '../context';
import './searchPanel.scss';


const SearchPanel = () => {
    
    
    const context = useContext(movieContext);
    
    const {movie, setMovieName, onFindMovie} = context;
    return (
        <section className="search-panel">
            
                <input name="name" className="search-panel__input" onChange={setMovieName}/>
                <button className="search-panel__btn" onClick={onFindMovie}>find</button>
                <div className="search-panel__hint" style={{visibility: movie.length === 0 ? 'visible' : 'hidden'}}>
                    Enter the name of the movie
                </div> 
            
        </section>
    )
}

export default SearchPanel;