import PersonaContext from "./persona-context";

const PersonaProvider = props => {
    const addFactorHandler = item => {};

    const removeFactorHandler = id => {};
    
    const personaContext = {

    }
    return <PersonaContext.Provider>
        {props.children}
    </PersonaContext.Provider>
};

export default PersonaProvider;