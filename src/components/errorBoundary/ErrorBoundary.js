import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if(this.state.hasError) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;