import classes from './FactorListItem.module.css'

const FactorListItem = (props) => {

    const handleClick = () => {
        props.onClick(props.name);
    }

    return (
        <div className={classes.item} onClick = {handleClick}>
            <h3>{props.name}</h3>
        </div>
    );
}

export default FactorListItem;