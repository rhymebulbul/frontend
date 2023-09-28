import React, { Fragment, useState } from "react";
import classes from "./Review.module.css";
import PersonaList from "../components/PersonaList";
import SliderFilter from "../components/SliderFilter";
import Select from 'react-select';
import Header from '../../../Layout/Header';

const Review = (props) => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  const token = storedData && storedData.token;

  const [option, setOption] = React.useState([{ value: null, label: 'All' }]);
  const [personaList, setPersonaList] = React.useState([]);

  const buildOptions = () => {
    const baseOption = [{ value: null, label: 'All' }];
    personaList.forEach((p) => {
      if (p.domainName && Array.isArray(p.domainName)) {
        p.domainName.forEach(domain => {
          if (!baseOption.some(opt => opt.value === domain)) {
            baseOption.push({
              value: domain,
              label: domain
            });
          }
        });
      }
    });
    return baseOption;
  };

  React.useEffect(() => {
    fetchUserPersona();
  }, []);

  React.useEffect(() => {
    const newOptions = buildOptions();
    setOption(newOptions);
  }, [personaList]);

  const fetchUserPersona = async () => {
    try {
      const response = await fetch(
        'http://localhost:8081/api/persona/getAllPersona',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      setPersonaList(data);
    } catch (error) {
      console.error("There was an error fetching all the user persona:", error);
    }
  }

  const [domainFilter, setDomainFilter] = useState(null);

  const handlerDomainChange = (domain) => {
    setDomainFilter(domain);
  }

  return (
    <>
      <Header />
      <Fragment>
        <div className={classes.main}>
          <div className={classes.filter}>
            <h3>Domain</h3>
            <Select options={option} value={domainFilter} onChange={handlerDomainChange} />
          </div>
          <div className={classes.personas}>
            <PersonaList personas={personaList} domain={domainFilter} />
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Review;
