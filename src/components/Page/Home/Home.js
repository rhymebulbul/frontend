import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HomeButton from './HomeButton'
import classes from './Home.module.css'
import Header from '../../Layout/Header';

const Home = (props) => {
    return (
        <Fragment>
            <Header />
            <div>
                <div className={classes.main}>
                    <h2 className={classes.title}>Make My Persona</h2>
                    <p className={classes.desc}>Create a persona which can help analyse the needs of target users</p>
                </div>
                <div className={classes.button}>
                    <Link to='/domain' style={{ textDecoration: "none" }}>
                        <HomeButton
                            name="Build My Persona"
                        />
                    </Link>
                    <Link to='/review' style={{ textDecoration: "none" }} >
                        <HomeButton
                            name="Review My Persona"
                        />
                    </Link>

                </div>
            </div>
        </Fragment>
    );
};

export default Home;