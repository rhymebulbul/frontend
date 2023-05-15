import classes from './DomainItem.module.css'

const DomainItem = (props) => {
    return (
        <div className={classes.item}>
            <h3>{props.name}</h3>
        </div>
    );
}

export default DomainItem;