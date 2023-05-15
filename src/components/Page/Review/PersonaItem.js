import classes from './PersonaItem.module.css'

const PersonaItem = (props) => {

    return (
        <li className={classes.persona}>
            <div>
                <h4>{props.name} / {props.age}</h4>
                <h4> Domain: {props.domain}</h4>
                <div className={classes.factor}>factor: {props.factor.map((item) => {
                    return item + ", "
                })}</div>
            </div>
        </li>
    )
}

export default PersonaItem;
