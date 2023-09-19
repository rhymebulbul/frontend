import PersonaItem from "./PersonaItem";
import classes from "./PersonaList.module.css";
import Card from "../../../../shared/components/UIElements/Card"


const PersonaList = (props) => {

  let filteredPersonaList = props.personas;

  if (props.domain && props.domain.value) {
    filteredPersonaList = filteredPersonaList.filter((p) => p.domainName.includes(props.domain.value));
  }

  const PersonaListRender = filteredPersonaList.map((p) => {
    // Get a snippet of content for preview. For example, displaying the first 50 characters.
    const contentSnippet = p.content ? (p.content.length > 50 ? `${p.content.substring(0, 47)}...` : p.content) : "";
    console.log(p._id);
    return (
      <PersonaItem
        key={p._id}
        id={p._id}
        type={p.type}
        domains={p.domainName.join(', ')}  // If domainName is an array, we join them with a comma.
        contentSnippet={contentSnippet}
      />
    );
  });

  return (
    <section className={classes.personas}>
      <h3>Personas</h3>
      <Card>
        <ul>{PersonaListRender}</ul>
      </Card>
    </section>
  );
};


export default PersonaList;
