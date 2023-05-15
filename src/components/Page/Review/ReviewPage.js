import { Fragment } from 'react';
import Persona from './Persona';
import classes from './ReviewPage.module.css'
import Header from '../../Layout/Header';

const ReviewPage = (props) => {
    return (
        <Fragment>
            <Header/>
            <div className={classes.main}>
                <div className={classes.left}>
                    <div className={classes.domain}>
                        <h2> Filter By Domain</h2>

                    </div>
                    <div className={classes.factor}>
                        <h2> Filter By Human Factor </h2>
                    </div>
                </div>
                <div className={classes.right}>
                    <h2> Previous Generated Persona</h2>
                    <Persona />
                </div>
            </div>
        </Fragment>
    );
};

export default ReviewPage;