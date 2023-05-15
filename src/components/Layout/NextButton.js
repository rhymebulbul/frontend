import classes from './NextButton.module.css'

const NextButton = (props) => {
    return (
        <button className={classes.button}>
            <span> {props.name}</span>
        </button>
    )
}

export default NextButton;