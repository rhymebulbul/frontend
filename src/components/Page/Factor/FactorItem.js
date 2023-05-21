import classes from './FactorItem.module.css'

const FactorItem = (props) => {
    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <div className= {classes.item}>
            <span>{props.name}</span>
            <button onClick = {handleClick}>X</button>
        </div>
    );
}

export default FactorItem;