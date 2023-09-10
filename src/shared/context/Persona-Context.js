import { createContext } from "react";

export const PersonaContext = createContext({
  persona: {},
  domain: null,
  addFactor: (factor) => {},
  removeFactor: (factor) => {},
  setDomain: (domain) => {}
});
