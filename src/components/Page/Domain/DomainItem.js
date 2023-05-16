import classes from './DomainItem.module.css'

const DomainItem = (props) => {
    return (
        <div className={classes.item} onClick={() => {
            props.onClick(props.name);
        }}>
            <h3>{props.name}</h3>
        </div>
    );
}

export default DomainItem;