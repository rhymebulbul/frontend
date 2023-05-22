import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './DomainPage.module.css'
import Header from '../../Layout/Header';
import Domains from './Domains';
import NextButton from '../../Layout/NextButton';

const DomainPage = (props) => {

    const [inputDomain, setInputDomain] = useState("");
    const [domain, setDomain] = useState("");

    function handleInputChange(event) {
        setInputDomain(event.target.value);
    }

    function handleClick(event) {
        setDomain(inputDomain)
        setInputDomain("")
        event.preventDefault();
    }

    function handlerSelectDomain(value) {
        setDomain(value)
    }

    return (
        <Fragment>
            <Header />
            <div className={classes.main}>
                <h2> Your Domain Selection is : {domain} </h2>
                <hr></hr>
                <h4>Select your domain </h4>
                <Domains onClick={handlerSelectDomain}/>
                <hr></hr>
                <div className={classes.domain}>
                    <h4>Or enter the domain</h4>
                    <form onSubmit={handleClick}>
                        <input 
                            onChange={handleInputChange}
                            type="text"
                            placeholder='domain'
                            value = {inputDomain}
                        />
                        <button type="submit">Set</button>
                    </form>
                </div>
            </div>
            <div className={classes.Buttons}>
                <div className={classes.BackButton}>
                    <Link to="/"> <NextButton name="back"/></Link>
                </div>
                
                {domain && <div className={classes.NextButton}>
                    <Link to="/factor"> <NextButton name="next"/></Link>
                </div>}
            </div>
        </Fragment>
    );
};

export default DomainPage;