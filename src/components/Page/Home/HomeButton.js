import classes from './HomeButton.module.css'

const HomeButton = (props) => {
    return (
        <button className={classes.button}>
            <span> {props.name} </span>
        </button>
    )
}

export default HomeButton;