import classes from './Persona.module.css'
import PersonaItem from './PersonaItem';

const DUMMY_PERSONA = [
    {
        id: 'p1',
        name: 'apple',
        age: '60',
        domain: 'technology',
        factor: ["goal", "limitation", "motivation"]
    },
    {
        id: 'p2',
        name: 'milk',
        age: '40',
        domain: 'education',
        factor: ["goal", "limitation", "motivation"]
    }
]

const Persona = () => {
    const personasList = DUMMY_PERSONA.map((p) => (
        <PersonaItem
          key={p.id}
          id={p.id}
          name={p.name}
          age={p.age}
          domain={p.domain}
          factor={p.factor}
        />
      ));

      return (
        <section className={classes.personas}>
          <div>
            <ul>{personasList}</ul>
          </div>
        </section>
      );
}

export default Persona;