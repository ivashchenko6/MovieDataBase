// import './singlePage.scss';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import RequestService from '../../../services/RequestService';
// import Spinner from '../../spinner/Spinner';
// import ErrorMessage from '../../errorMessage/ErrorMessage';


// const SinglePage = ({Component, currentSearch}) => {
//     const {id} = useParams();
//     const [data, setData] = useState(null);
//     const {loading, error, clearError, getDataById, getExternalId} = RequestService();
    
//     useEffect(() => {
//         updateData();
//     }, [id])

//     useEffect(() => {
//         console.log(data);
//     }, [data])
    
//     const updateData = async () => {
//         clearError();
        
//         await getExternalId(id, currentSearch)
//             .then(externalId => getDataById(externalId.imdb_id, 'imdb_id', currentSearch) )
//             .then(data => onDataLoaded(data[`${currentSearch}_results`][0]));
//     }

    

//     const onDataLoaded = (data) => setData(data)

//     const spinner = loading ? <Spinner/> : null;
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const content = !(loading || error || !data) ? <Component data={data}/> : null

//     return (
//         <>
//             {spinner}
//             {errorMessage}
//             {  
//                 content
//             }
//         </>
        
//     )
// }




// export default SinglePage;