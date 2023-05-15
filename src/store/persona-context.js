import React from 'react';

const PersonaContext = React.createContext({
    domain: '',
    factors: [],
    age: 0,
    addFactor: (factor) => {},
    removeFactor: (id) => {}
})

export default PersonaContext;