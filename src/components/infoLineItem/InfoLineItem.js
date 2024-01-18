
import './infoLineItem.scss';
const InfoLineItem = ({classesName, title, content}) => {


    return <div className={classesName}><span className="info-mark">{title}: </span><span className="information-item">{content}</span></div>
}

export default InfoLineItem;