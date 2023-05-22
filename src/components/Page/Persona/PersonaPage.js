import { Fragment } from 'react';
import classes from './PersonaPage.module.css'
import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Link } from 'react-router-dom';
import avatar from './../../../images/avatar.png';

const PersonaPage = (props) => {
    return (
        <Fragment>
            <Header />
            <div className={classes.main}>
                <div className={classes.left}>
                    <div className={classes.photo}>
                        <img src = {avatar} alt=''/>
                    </div>
                    <div className={classes.detail}>
                        <ul className={classes.nobullets}>
                            <li>Name: Hailm</li>
                            <li>Age: 60</li>
                            <li>Job: Retiree</li>
                        </ul>
                    </div>
                    <div className={classes.backButton}>
                        <Link to="/factor"> <NextButton name="back" /></Link>
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
                            <p>He finds that it takes too much effort to learn about new devices associated to mobile technology such as mobile phone, smart phone and tablet even though he is aware about the benefits of using them.He claims that he has difficulties in remembering things.</p>
                        </div>
                    </div>
                    <div className={classes.factor3}>
                        <h4>Goal: </h4>
                        <p>To use mobile technology with minimal effort and learning stages.</p>
                    </div>
                    <div className={classes.factor4}>
                        <h4> Adaptation to Technology: </h4>
                        <p>Hailm is open to adopting new technologies, as long as they can improve his quality of life and help him maintain her independence. He understands the potential benefits of technology but requires clear instructions and hands-on support to feel comfortable using it.</p>
                    </div>
                    <div className={classes.NextButton}>
                        <NextButton name="EXPORT" />
                        <NextButton name="REGENERATE" />
                        <NextButton name="EDIT" />
                        <NextButton name="SAVE" />
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default PersonaPage;