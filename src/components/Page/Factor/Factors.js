import classes from './Factors.module.css'
import { useState } from 'react';
const Factors = (props) => {

    const [inputFactor, setInputFactor] = useState("");


    function handleInputChange(event) {
        setInputFactor(event.target.value);
    }

    function handleClick(event) {
        if (inputFactor.length > 0) {
            props.addFactor(inputFactor)
            setInputFactor("")
        }
        event.preventDefault();
    }

    return (
        <div className={classes.main}>
            <h4>Or enter the factors</h4>
            <form onSubmit={handleClick}>
                <input
                    onChange={handleInputChange}
                    type="text"
                    placeholder='factor'
                    value={inputFactor}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Factors