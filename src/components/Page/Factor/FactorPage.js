import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './FactorPage.module.css'
import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import FactorList from './FactorList';
import Factors from './Factors';
import FactorItem from './FactorItem';

const FactorPage = (props) => {

    const [factors, setFactors] = useState([]);


    function addFactor(newFactor) {
        setFactors(prev => {
            return [...prev, newFactor];
        })
    }

    function deleteFactor(id) {
        setFactors(prev => {
            return prev.filter((_, index) => {
                return index !== id;
            })
        })
    }

    function clickFactor(newFactor) {
        setFactors(prev => {
            return [...prev, newFactor];
        })
    }

    return (
        <Fragment>
            <Header />
            <div className={classes.main}>
                <h2> Select or enter the Factor </h2>
                <hr></hr>
                <h4>Select your factor </h4>
                <FactorList onClick={clickFactor} />
                <hr></hr>
                <div className={classes.bottom}>
                    <Factors addFactor={addFactor} deleteFactor={deleteFactor} />
                    <div className={classes.right}>
                        {factors.map((item, index) => {
                            return (
                                <FactorItem
                                    key={index}
                                    id={index}
                                    name={item}
                                    onDelete={deleteFactor}
                                />
                            )
                        })}
                    </div>

                </div>
            </div>
            <div className={classes.Buttons}>
                <div className={classes.BackButton}>
                    <Link to="/domain"> <NextButton name="back" /></Link>
                </div>
                <div className={classes.NextButton}>
                    <Link to="/persona"> <NextButton name="next" /></Link>
                </div>
            </div>

        </Fragment>
    );
};

export default FactorPage;