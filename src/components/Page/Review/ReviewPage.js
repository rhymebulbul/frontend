import { Fragment } from 'react';
import Persona from './Persona';
import classes from './ReviewPage.module.css'
import Header from '../../Layout/Header';

const DUMMY_DOMAIN = [
    {
        id: 'd1',
        name: 'Technology',
    },
    {
        id: 'd2',
        name: 'Software development',
    },
    {
        id: 'd3',
        name: 'Health'
    },
    {
        id: 'd4',
        name: 'Education'
    },
    {
        id: 'd5',
        name: 'Finance'
    }
]

const ReviewPage = (props) => {
    const domainOption = DUMMY_DOMAIN.map(item => (
        <option 
            key = {item.key}
            id = {item.id}
            value = {item.name}
        >
        {item.name}
        </option>
    ));

    return (
        <Fragment>
            <Header/>
            <div className={classes.main}>
                <div className={classes.left}>
                    <div className={classes.domain}>
                        <h2> Filter By Domain</h2>
                        <select id="domain" name="domain">
                        {domainOption}
                        </select>
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