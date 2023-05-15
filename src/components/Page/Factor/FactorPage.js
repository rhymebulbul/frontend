import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './FactorPage.module.css'
import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';

const FactorPage = (props) => {
    return (
        <Fragment>
            <Header />
            <div>
                <h2> Select or enter the Factor </h2>
                <hr></hr>
                <hr></hr>
            </div>
            <div className={classes.NextButton}>
                <Link to="/persona"> <NextButton/></Link>
            </div>
        </Fragment>
    );
};

export default FactorPage;