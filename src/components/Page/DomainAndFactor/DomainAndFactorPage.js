import {Typography,Grid,Box,TextField,Container} from '@mui/material';
import Header from '../../Layout/Header';
import NewDomainDialog from './NewDomain';
import * as React from 'react';
import AddNewExternalHumanFactor from './AddNewExternalHumanFactor';
import AddNewInternalHumanFactor from './AddNewInternalHumanFactor';
import MultipleSelectableList from '../../Layout/MultipleSelectableList';
import NextButton from '../../Layout/NextButton';
import { Link } from 'react-router-dom';



const DomainAndFactorPage = (props) => {

  const [checked, setChecked] = React.useState([]);

  const [domainList,setDomainList] = React.useState(["Technology for older adults","Software Development","Health","Education","Finance"]);


  const [internalHumanFactor,setInternalHumanFactor] = React.useState ([
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

  const [externalHumanFactor,setExternalHumanFactor] = React.useState([
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

   const [selectedExHF,setSelectedExHF] = React.useState([]);
   const [selectedInHF,setSelectedInHF] = React.useState([]);
   const [extraDetails,setExtraDetails] = React.useState("");



  



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



  const addNewDomain = (newDomain) =>{
    setDomainList([newDomain,...domainList]);
  };


  const addNewInHumanFactor = (newInHF) =>{
    setInternalHumanFactor([newInHF,...internalHumanFactor]);
  };

  const addNewExternalHumanFactor = (newExHF) =>{
    setExternalHumanFactor([newExHF,...externalHumanFactor]);
  };

  React.useEffect(() => {
    const storedChecked = localStorage.getItem('checked');
    const storedSelectedExHF = localStorage.getItem('selectedExHF');
    const storedSelectedInHF = localStorage.getItem('selectedInHF');
    const storedExtraDetails = localStorage.getItem('extraDetails');

    if (storedChecked) setChecked(JSON.parse(storedChecked));
    if (storedSelectedExHF) setSelectedExHF(JSON.parse(storedSelectedExHF));
    if (storedSelectedInHF) setSelectedInHF(JSON.parse(storedSelectedInHF));
    if (storedExtraDetails) setExtraDetails(storedExtraDetails);
}, []);

  React.useEffect(() => {
      localStorage.setItem('checked', JSON.stringify(checked));
      localStorage.setItem('selectedExHF', JSON.stringify(selectedExHF));
      localStorage.setItem('selectedInHF', JSON.stringify(selectedInHF));
      localStorage.setItem('extraDetails', extraDetails);
    }, [checked, selectedExHF, selectedInHF, extraDetails]);




  console.log (checked);
  console.log (selectedExHF);
  console.log (selectedInHF);
  console.log (extraDetails);

    return (
      <div style={{ overflow: 'hidden' }}>
        <Header />
  <Container maxWidth="xl">
    <Grid container direction="column" justifyContent="space-between" alignItems="stretch">

      <Grid item container sx={{ m: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Domain</Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <NewDomainDialog addNewDomain={addNewDomain} />
          </Grid>
        </Grid>
      </Grid>

      <MultipleSelectableList itemList={domainList} selectedItems={checked} handleToggle={handleToggle}   />

      <Grid item container sx={{ m: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Human Factor ( External )</Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <AddNewExternalHumanFactor addNewExternalHumanFactor={addNewExternalHumanFactor} />
          </Grid>
        </Grid>
      </Grid>

      <MultipleSelectableList itemList={externalHumanFactor} selectedItems={selectedExHF} handleToggle={handleExHFToggle} />

      <Grid item container sx={{ m: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Human Factor ( Internal )</Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <AddNewInternalHumanFactor addNewInHumanFactor={addNewInHumanFactor} />
          </Grid>
        </Grid>
      </Grid>

      <MultipleSelectableList itemList={internalHumanFactor} selectedItems={selectedInHF} handleToggle={handleInHFToggle}/>

      <Grid item container sx={{ m: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Specify any details you want to focus on</Typography>
      </Grid>
      <Grid item container sx={{ m: 3 }}>
          <TextField 
            fullWidth
            label="Extra Details" 
            id="fullWidth" 
            multiline
            rows={2}
            placeholder="Example: I want to set the age as 68 years old; I want to set the gender as female;"
            inputProps={{ style: {  padding: "10px" } }} 
            onChange={(e) => { setExtraDetails(e.target.value) }}
          />
      </Grid>


      <Grid item container justifyContent="center" >
        {selectedExHF.length > 0 && selectedInHF.length > 0 && checked.length > 0 && (
          <div>
           <Link to='/dimension'>
              <NextButton name = "Next"/>
           </Link>
            
            
          </div>
        )}
      </Grid>
    </Grid>

  </Container>
</div>
    );
};

export default DomainAndFactorPage;