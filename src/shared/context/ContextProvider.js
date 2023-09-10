import { useReducer } from "react";

import { PersonaContext } from "./Persona-Context";

const defaultPersonaState = {
  factor: {},
  domain: null,
};

const personaReducer = (state, action) => {
  if (action.type === "ADD") {
    const title = action.factor.title;
    const context = action.factor.context;
    let updatedFactor = { ...state.factor, [title]: context };

    return {
      factor: updatedFactor,
      domain: state.domain,
    };
  }

  if (action.type === "REMOVE") {
    let updatedFactor = { ...state.factor };
    let title = action.factor;
    delete updatedFactor[title];

    return {
      factor: updatedFactor,
      domain: state.domain,
    };
  }

  if (action.type === "SETDOMAIN") {
    return {
      factor: state.factor,
      domain: action.domain,
    };
  }

  return defaultPersonaState;
};

const PersonaProvider = (props) => {
  const [personaState, dispatchPersonaAction] = useReducer(
    personaReducer,
    defaultPersonaState
  );

  const addFactortHandler = (factor) => {
    dispatchPersonaAction({ type: "ADD", factor: factor });
  };

  const removeFactortHandler = (factor) => {
    dispatchPersonaAction({ type: "REMOVE", factor: factor });
  };

  const SetDomainHandler = (domain) => {
    dispatchPersonaAction({ type: "SETDOMAIN", domain: domain });
  };

  const personaContext = {
    domain: personaState.domain,
    factor: personaState.factor,
    addFactor: addFactortHandler,
    removeFactor: removeFactortHandler,
    setDomain: SetDomainHandler
  };

  return (
    <PersonaContext.Provider value={personaContext}>
      {props.children}
    </PersonaContext.Provider>
  );
};

export default PersonaProvider;
