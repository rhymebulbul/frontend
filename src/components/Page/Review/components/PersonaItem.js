import classes from "./PersonaItem.module.css";
import { useNavigate } from 'react-router-dom';

const PersonaItem = (props) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        props.type === "bulletPoints" ? navigate(`/bulletPointPersona/${props.id}`) : navigate(`/narrativePersona/${props.id}`);
    }

    return (
        <li className={classes.persona} onClick={onClickHandler}>
            <div>
                <h3>Type: {props.type}</h3>
                <div className={classes.domain}>Domains: {props.domains}</div>
                <p>Content: {props.contentSnippet}</p>
            </div>
        </li>
    );
}

export default PersonaItem;
