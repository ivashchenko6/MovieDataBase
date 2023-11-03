// import { useEffect, useState } from "react";
// import { useHref, useMatch, useParams } from "react-router-dom";
// import RequestService from "../../../services/RequestService";
// import Spinner from "../../spinner/Spinner";
// import ErrorMessage from "../../errorMessage/ErrorMessage";


// const SinglePageInfo = ({Component, dataType}) => {

//     const {id} = useParams();
//     const [data, setData] = useState([]);
    

//     let currenSectionPage = '';
    

//     switch(dataType) {
//         case 'movie':
//             currenSectionPage = 'movie_results'
//             break;
//         case 'person':
//             currenSectionPage = 'person_results';
//             break;    
//     }

//     const {loading, error, clearError, getMovieById, getExternalId} = RequestService();

//     useEffect(() => {
//         updateData();
//     }, [id])

    
    
//     useEffect(() => {
//         console.log(`Data in parent`, data);
//     },[data])
    
//     const updateData = async () => {
//         clearError();
//         const externalId = await getExternalId(id);
        
//         getMovieById(externalId.imdb_id, 'imdb_id').then(onDataLoaded);
        
        
//     }

//     const onDataLoaded = (data) => {
        
//         setData(data);
        

//     }
//     const spinner = loading ? <Spinner/> : null
//     const errorMessage = error ? <ErrorMessage/> : null
//     const content = !(loading || error) ? <Component infoData={data.movie_results}/> : null
//     return (
//         <div>
//             {spinner}
//             {errorMessage}
//             {content}

//         </div>
//     )
// }
// export default SinglePageInfo;
