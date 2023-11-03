import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const request = useCallback( async (url) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWJkOTkwZDQ1MDY4NzBlNjNkZWJhYTkxMzEwMmNhYyIsInN1YiI6IjY1MWNhODBkOTY3Y2M3MzQyNDY4ODAxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.12aVbNIJGDTl_MM_fdEjsSHpQ2JebWeXTnCH_laTF0Q'
            }});

            if(!response.ok) {
                throw new Error(`Something went wrong! Could not fetch ${url}. status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data
        } catch (e) {
            setError(e.message);
            setLoading(false);
            throw e;
        }
    }, [])
    const clearError = useCallback(() => setError(null), []);

    return {loading, error, clearError, request};
}

