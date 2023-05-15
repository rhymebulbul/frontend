import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './DomainPage.module.css'
import Header from '../../Layout/Header';
import Domains from './Domains';
import NextButton from '../../Layout/NextButton';

const DomainPage = (props) => {
    return (
        <Fragment>
            <Header />
            <div className={classes.main}>
                <h2> Select or enter the domain </h2>
                <hr></hr>
                <Domains/>
                <hr></hr>
            </div>
            <div className={classes.NextButton}>
                <Link to="/factor"><NextButton/></Link>
            </div>
        </Fragment>
    );
};

export default DomainPage;