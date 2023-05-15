import classes from './Domains.module.css'
import DomainItem from './DomainItem';

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

const rows = DUMMY_DOMAIN.reduce(function (rows, key, index) {
    return (index % 3 === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
}, []);


const Domains = (props) => {
    const domainList1 = rows[0].map(item => (
        <DomainItem 
            key = {item.key}
            id = {item.id}
            name = {item.name}
        />
    ));

    const domainList2 = rows[1].map(item => (
        <DomainItem 
            key = {item.key}
            id = {item.id}
            name = {item.name}
        />
    ));

    return (
        <section className={classes.domain}>
            <div className = {classes.row}>
                {domainList1}
            </div>
            <div className = {classes.row}>
                {domainList2}
            </div>
        </section>
    );
}

export default Domains;