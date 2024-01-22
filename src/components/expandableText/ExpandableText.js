import { useState } from "react";
import './expandableText.scss';
const ExpandableText = ({text, classNames, maxSymbols}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    
    

    return (
        <>
            <p  className={`expandable-text ${classNames}`}> {text.slice(0, maxSymbols) + (isOpen ? text.slice(maxSymbols) : "")} </p>
            <button className="show-close__btn" onClick={() => setIsOpen(!isOpen)}> {isOpen ? "^" : "..."} </button>
        </>
        
    )
}

export default ExpandableText;