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
                    <div className={classes.photo}></div>
                    <div className={classes.detail}>
                        <div className={classes.line}><p>Name: name123</p></div>
                        <div className={classes.line}><p>Age: 60</p></div>
                        <div className={classes.line}><p>Job: Retiree</p></div>
                    </div>
                </div>
                <div className={classes.vl}>

                </div>
                <div className={classes.right}>
                    <div className={classes.row}>
                        <div className={classes.factor1}>
                            <h4>Living Arrangement: </h4>
                            <p>Lives all by himself after his wift passed away a year ago</p>
                        </div>
                        <div className={classes.factor2}>
                            <h4>Frustration: </h4>
                            <p>Lives all by himself after his wift passed away a year ago</p>
                        </div>
                    </div>
                    <div className={classes.factor3}>
                        <h4>Goal: </h4>
                        <p>Lives all by himself after his wift passed away a year ago</p>
                    </div>
                    <div className={classes.factor4}>
                        <h4> Adaptation to Technology: </h4>
                        <p>Lives all by himself after his wift passed away a year ago</p>
                    </div>
                    <div className={classes.NextButton}>
                        <NextButton name="EXPORT" />
                        <NextButton name="REGENERATe" />
                        <NextButton name="EDIT" />
                        <NextButton name="SAVE" />
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default PersonaPage;