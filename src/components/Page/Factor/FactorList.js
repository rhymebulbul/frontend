import classes from './FactorList.module.css'
import FactorListItem from './FactorListItem';

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

const FactorList = (props) => {
    const factorList1 = rows[0].map(item => (
        <FactorListItem 
            key = {item.id}
            id = {item.id}
            name = {item.name}
            onClick = {props.onClick}
        />
    ));

    const factorList2 = rows[1].map(item => (
        <FactorListItem 
            key = {item.id}
            id = {item.id}
            name = {item.name}
            onClick = {props.onClick}
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

export default FactorList;