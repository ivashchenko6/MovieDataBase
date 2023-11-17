import { useHttp } from "../hooks/http.hook";

const RequestService = () => {

    const _apiBase = `https://api.themoviedb.org/3/`;
    const {loading, error, clearError, request} = useHttp();

    const getGenres = async (genres = []) => {
        const res = await request(`${_apiBase}genre/movie/list?language=en`);
        const genresList = res.genres.filter(item => genres.includes(item.id));
        return genresList;
    }
    
    const getMovieByName = async (movie = '') => {
        const res = await request(`${_apiBase}search/movie?query=${movie}&include_adult=true&language=en-US `);
        console.log(res);
        return res.results.map(_transformData);
    }

    const getTrendingMovies = async () => {
        const res = await request(`${_apiBase}movie/popular?include_adult=true&language=en-US&page=1`);
        
        return res.results.map(_transformData);
    }

    const getMovieById = async (id = 0, externalSource) => {
        const res = await request(`${_apiBase}find/${id}?external_source=${externalSource}`);
        const currentGenres = await getGenres(res.movie_results[0].genre_ids)
        res.movie_results[0]['genres_list'] = currentGenres;
        return res;
        
    }

    const getExternalId = async (id = 0, type = 'movie') => {
        
        const res = await request(`${_apiBase}${type}/${id}/external_ids`);
        return res;
    }



    const getTrendingPeople = async (time_window = 'week') => {
        const res = await request (`${_apiBase}trending/person/${time_window}`);
        return res;
    }

    const _transformData = (data) => {
        
        const {adult, id, title, overview: description, poster_path: poster, vote_average: average, release_date, original_title, original_language, vote_count} = data;
        return {
            adult,
            id, 
            title, 
            overview: description, 
            poster_path: poster, 
            vote_average: average, 
            release_date,
            original_title,
            original_language,
            vote_count
        }
    }; 


    return {loading, 
            error, 
            clearError, 
            getMovieByName,
            getTrendingMovies,
            getMovieById,
            getExternalId,
            getGenres,
            getTrendingPeople,
        }

}


export default RequestService;