import React, { Fragment, useState } from "react";
import classes from "./Review.module.css";
import PersonaList from "../components/PersonaList";
import SliderFilter from "../components/SliderFilter";
import Select from 'react-select';
import Header from '../../../Layout/Header';
const PERSONA_FAKE = [
  {
    id: "p1",
    name: "name 1",
    age: 10,
    domain: "teaching",
  },
  {
    id: "p2",
    name: "name 2",
    age: 30,
    domain: "learn",
  },
  {
    id: "p3",
    name: "name 3",
    age: 60,
    domain: "makeing friends",
  },
];


const Review = (props) => {

  const option = [{ value: null, label: 'All' }];

  PERSONA_FAKE.map((p) => (
    option.push({
      value: p.domain,
      label: p.domain
    })
  ));

  const [ageValue, setAgeValue] = useState([0, 100]);
  const [domainFilter, setDomainFilter] = useState(null);

  const handleSliderChange = (values) => {
    // Handle the slider value change, e.g., filter data based on the slider values
    setAgeValue(values);
  };

  const handlerDomainChange = (domain) => {
    setDomainFilter(domain);
  }

  return (
    <>
      <Header />
      <Fragment>
        <div className={classes.main}>
          <div className={classes.filter}>
            <h3>Age range</h3>
            <SliderFilter
              minValue={0}
              maxValue={100}
              onChange={handleSliderChange}
            />
            <h3>Domain</h3>
            <Select options={option} value={domainFilter} onChange={handlerDomainChange} />
          </div>
          <div className={classes.personas}>
            <PersonaList personas={PERSONA_FAKE} ageRange={ageValue} domain={domainFilter} />
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Review;
