import classes from './NextButton.module.css'

const NextButton = (props) => {
    return (
        <button className={classes.button}>
            <span>next</span>
        </button>
    )
}

export default NextButton;