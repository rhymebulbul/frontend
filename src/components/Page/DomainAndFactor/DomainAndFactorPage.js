import { Typography, Grid, Box, TextField, Container } from '@mui/material';
import Header from '../../Layout/Header';
import NewDomainDialog from './NewDomain';
import * as React from 'react';
import AddNewExternalHumanFactor from './AddNewExternalHumanFactor';
import AddNewInternalHumanFactor from './AddNewInternalHumanFactor';
import MultipleSelectableList from '../../Layout/MultipleSelectableList';
import NextButton from '../../Layout/NextButton';
import { Link } from 'react-router-dom';

const textareaStyles = {
  width: '100%',
  padding: '20px 0 6px 0',
  border: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.23)',
  fontSize: '1rem',
  boxSizing: 'border-box',
  outline: 'none',
  resize: 'none'
};


const DomainAndFactorPage = (props) => {

  const [checked, setChecked] = React.useState([]);

  const [domainList, setDomainList] = React.useState(["Technology for older adults", "Software Development", "Health", "Education", "Finance"]);


  const [internalHumanFactor, setInternalHumanFactor] = React.useState([
    "Motivation",
    "Goal",
    "Concern/frustration/pain point",
    "Language",
    "Comfort with technology",
    "Location",
    "Skill",
    "Behaviour",
    "Life experience",
    "Family structure",
    "Living arrangement",
    "Occupation"
  ]);

  const [externalHumanFactor, setExternalHumanFactor] = React.useState([
    "Name",
    "Age",
    "Gender",
    "Interest",
    "Education",
    "Hobby",
    "Habit",
    "Emotion",
    "Activity",
    "Personality/personal attribute",
    "Privacy"
  ]);

  const [selectedExHF, setSelectedExHF] = React.useState([]);
  const [selectedInHF, setSelectedInHF] = React.useState([]);
  const [extraDetails, setExtraDetails] = React.useState("");







  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

  };


  const handleExHFToggle = (value) => () => {
    const currentIndex = selectedExHF.indexOf(value);
    const newChecked = [...selectedExHF];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedExHF(newChecked);

  };

  const handleInHFToggle = (value) => () => {
    const currentIndex = selectedInHF.indexOf(value);
    const newChecked = [...selectedInHF];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedInHF(newChecked);

  };



  const addNewDomain = (newDomain) => {
    setDomainList([newDomain, ...domainList]);
  };


  const addNewInHumanFactor = (newInHF) => {
    setInternalHumanFactor([newInHF, ...internalHumanFactor]);
  };

  const addNewExternalHumanFactor = (newExHF) => {
    setExternalHumanFactor([newExHF, ...externalHumanFactor]);
  };

  React.useEffect(() => {
    const storedChecked = sessionStorage.getItem('checked');
    const storedSelectedExHF = sessionStorage.getItem('selectedExHF');
    const storedSelectedInHF = sessionStorage.getItem('selectedInHF');
    const storedExtraDetails = sessionStorage.getItem('extraDetails');

    if (storedChecked) setChecked(JSON.parse(storedChecked));
    if (storedSelectedExHF) setSelectedExHF(JSON.parse(storedSelectedExHF));
    if (storedSelectedInHF) setSelectedInHF(JSON.parse(storedSelectedInHF));
    if (storedExtraDetails) setExtraDetails(storedExtraDetails);
  }, []);


  React.useEffect(() => {
    sessionStorage.setItem('checked', JSON.stringify(checked));
    sessionStorage.setItem('selectedExHF', JSON.stringify(selectedExHF));
    sessionStorage.setItem('selectedInHF', JSON.stringify(selectedInHF));
    sessionStorage.setItem('extraDetails', extraDetails);
  }, [checked, selectedExHF, selectedInHF, extraDetails]);



  console.log(checked);
  console.log(selectedExHF);
  console.log(selectedInHF);
  console.log(extraDetails);

  return (
    <>
      <Header></Header>
      <Box sx={{ m: 2 }} >
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">

          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Domain</Typography>
            <NewDomainDialog addNewDomain={addNewDomain} />
          </Box>

          <Box p={2}>
            <MultipleSelectableList itemList={domainList} selectedItems={checked} handleToggle={handleToggle} />
          </Box>

          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>Select Human Factor ( External )</Typography>
            <AddNewExternalHumanFactor addNewExternalHumanFactor={addNewExternalHumanFactor} />
          </Box>

          <Box p={2}>
            <MultipleSelectableList itemList={externalHumanFactor} selectedItems={selectedExHF} handleToggle={handleExHFToggle} />
          </Box>

          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>Select Human Factor ( Internal )</Typography>
            <AddNewInternalHumanFactor addNewInHumanFactor={addNewInHumanFactor} />
          </Box>

          <Box p={2}>
            <MultipleSelectableList itemList={internalHumanFactor} selectedItems={selectedInHF} handleToggle={handleInHFToggle} />
          </Box>

          <Box display="flex" flexDirection="column" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>Specify any details you want to focus on</Typography>

            <textarea
              style={textareaStyles}
              id="fullWidth"
              rows={2}
              placeholder="Example: I want to set the age as 68 years old; I want to set the gender as female;"
              onChange={(e) => { setExtraDetails(e.target.value) }}
            ></textarea>

          </Box>

          <Box display="flex" justifyContent="center">
            {selectedExHF.length > 0 && selectedInHF.length > 0 && checked.length > 0 && (
              <div>
                <Link to='/dimension'>
                  <NextButton name="Next" />
                </Link>
              </div>
            )}
          </Box>

        </Box>


      </Box >
    </>




  );
};

export default DomainAndFactorPage;