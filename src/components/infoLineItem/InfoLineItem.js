
import './infoLineItem.scss';
const InfoLineItem = ({classesName, title, content}) => {


    return <div className={classesName}><span className="info-mark">{title}: </span><p className="information-item">{content}</p></div>
}

export default InfoLineItem;