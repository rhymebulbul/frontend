import classes from './Factors.module.css'
import FactorItem from './FactorItem';

const DUMMY_FACTOR = [
    {
        id: 'f1',
        name: 'Education background',
    },
    {
        id: 'f2',
        name: 'Health challenge',
    },
    {
        id: 'f3',
        name: 'Occupation'
    },
    {
        id: 'f4',
        name: 'Technology Literacy'
    },
    {
        id: 'f5',
        name: 'Social interaction'
    }
]

const rows = DUMMY_FACTOR.reduce(function (rows, key, index) {
    return (index % 3 === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
}, []);

const Factors = (props) => {
    const factorList1 = rows[0].map(item => (
        <FactorItem 
            key = {item.key}
            id = {item.id}
            name = {item.name}
        />
    ));

    const factorList2 = rows[1].map(item => (
        <FactorItem 
            key = {item.key}
            id = {item.id}
            name = {item.name}
        />
    ));

    return (
        <section className={classes.factor}>
            <div className = {classes.row}>
                {factorList1}
            </div>
            <div className = {classes.row}>
                {factorList2}
            </div>
        </section>
    );
}

export default Factors;