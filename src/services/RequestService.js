import { useHttp } from "../hooks/http.hook";

const RequestService = () => {

    const _apiBase = `https://api.themoviedb.org/3/`;
    const {loading, error, clearError, request} = useHttp();

    const getMovieReviews = async (movieId = 0, language = 'en-US') => {
        const res = await request(`${_apiBase}movie/${movieId}/reviews?language=${language}&page=1`)
        return res;
    }

    const getGenres = async (genres = []) => {
        const res = await request(`${_apiBase}genre/movie/list?language=en`);
        const genresList = res.genres.filter(item => genres.includes(item.id));
        return genresList;
    }
    
    const getMovieByName = async (movie = '') => {
        const res = await request(`${_apiBase}search/movie?query=${movie}&include_adult=true&language=en-US`);
        return res.results.map(_transformData)
    }

    const getTrendingMovies = async () => {
        const res = await request(`${_apiBase}movie/popular?include_adult=true&language=en-US&page=1`);
        const results = await res.results.map(_transformData);
        
        return results
    }

    const getExternalId = async (id = 0, type = 'movie') => {
        
        const res = await request(`${_apiBase}${type}/${id}/external_ids`);
        return res;
    }

    const getDataById = async (id = 0, externalSource, type) => {
        
        const externalId = await getExternalId(id, type).then(obj => obj[externalSource]);
        
        const res = await request(`${_apiBase}find/${externalId}?external_source=${externalSource}`);
        
        if(type === 'movie') {
            const currentGenres = await getGenres(res.movie_results[0].genre_ids)
            const reviews = await getMovieReviews(id);
            
            res.movie_results[0]['genres_list'] = currentGenres;
            res.movie_results[0]['reviews'] = reviews;
        }
        console.log(res[`${type}_results`][0])
        return res[`${type}_results`][0];
        
    }

    



    const getTrendingPeople = async (time_window = 'week') => {
        const res = await request (`${_apiBase}trending/person/${time_window}`);
        return res;
    }

    const getGenresList = async (language = 'en') => {
        const res = await request(`${_apiBase}genre/movie/list?language=${language}`);
        return res.genres; 
    }

    

    const _transformData = (data) => {
        
        const {adult, id, title, overview: description, poster_path: poster, vote_average: average, release_date, original_title, original_language, vote_count} = data;
        return  {
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
            getDataById,
            getExternalId,
            getGenres,
            getGenresList,
            getMovieReviews, 
            getTrendingPeople,
        }

}


export default RequestService;