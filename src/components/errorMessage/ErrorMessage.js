
import errorGif from './error.gif';
const ErrorMessage = () => {


    return (
        <>
            <h1>Something went wrong</h1>
            <img src={errorGif} alt="error"/>
        </>
    )
}
export default ErrorMessage;