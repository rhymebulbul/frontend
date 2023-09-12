import classes from "./PersonaItem.module.css"
import { useNavigate } from 'react-router-dom';

const PersonaItem = (props) => {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/persona/${props.id}`);
    }

    return (
        <li className={classes.persona} onClick={onClickHandler}>
            <div>
                <h3> Name : {props.name} </h3>
                <h3> Age : {props.age}</h3>
                <div className={classes.domain}>Domain : {props.domain}</div>
            </div>
        </li> 
    )
}

export default PersonaItem;