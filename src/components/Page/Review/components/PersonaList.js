import PersonaItem from "./PersonaItem";
import classes from "./PersonaList.module.css";
import Card from "../../../../shared/components/UIElements/Card"


const PersonaList = (props) => {
  let filteredPersonaList = props.personas.filter((p) => p.age >= props.ageRange[0] && p.age <= props.ageRange[1]);

  if (props.domain && props.domain.value) {
    filteredPersonaList = filteredPersonaList.filter((p) => p.domain === props.domain.value);
  }

  const PersonaList = filteredPersonaList.map((p) => (
    <PersonaItem
      key={p.id}
      id={p.id}
      name={p.name}
      age={p.age}
      domain={p.domain}
    />
  ));

  return (
    <section className={classes.personas}>
      <h3>Personas</h3>
      <Card>
        <ul>{PersonaList}</ul>
      </Card>
    </section>
  );
};

export default PersonaList;
