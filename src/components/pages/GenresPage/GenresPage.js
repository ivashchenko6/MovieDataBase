import { useEffect } from "react";
import RequestService from "../../../services/RequestService";

const GenresPage = () => {

    const {loading, error, getGenresList, } = RequestService();

    useEffect(() => {
        
        
    }, [])

    return "All genres";
}

export default GenresPage;