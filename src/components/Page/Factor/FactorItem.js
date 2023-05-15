import classes from './FactorItem.module.css'

const FactorItem = (props) => {
    return (
        <div className={classes.item}>
            <h3>{props.name}</h3>
        </div>
    );
}

export default FactorItem;