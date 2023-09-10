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
                    <h2 className={classes.title}>Let's MAKE YOUR PERSONA BY AI</h2>
                </div>
                <div className={classes.button}>
                    <Link to='/domainAndFactor' style={{ textDecoration: "none"  ,width:"300px"}}>
                        <HomeButton
                            name="Build My Persona"
                        />
                    </Link>
                    <Link to='/review' style={{ textDecoration: "none"  ,width:"300px"}} >
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