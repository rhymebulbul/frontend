import classes from './Domains.module.css'
import DomainItem from './DomainItem';

const DUMMY_DOMAIN = [
    {
        id: 'd1',
        name: 'technology',
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

const Domains = (props) => {
    const domainList = DUMMY_DOMAIN.map((d) => (
        <DomainItem
            key={d.id}
            id={d.id}
            name={d.name}
        />
    ));

    return (
        <section className={classes.domain}>
            <div>
                <ul>{domainList}</ul>
            </div>
        </section>
    );
}

export default Domains;