import { Fragment } from 'react';
import classes from './PersonaPage.module.css'
import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';

const PersonaPage = (props) => {
    return (
        <Fragment>
            <Header />
            <div className={classes.main}>
                <div className={classes.left}>
                    <h3>left</h3>
                </div>
                <div className={classes.vl}>

                </div>
                <div className={classes.right}>
                    <h3>right</h3>
                </div>
            </div>
            <div className={classes.NextButton}>
                <NextButton name = "EXPORT"/>
                <NextButton name = "REGENERATe"/>
                <NextButton name = "EDIT"/>
                <NextButton name = "SAVE"/>
            </div>
        </Fragment>
    );
};

export default PersonaPage;