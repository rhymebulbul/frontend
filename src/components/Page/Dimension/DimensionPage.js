import * as React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Header from '../../Layout/Header';
import SingleSelectableList from '../../Layout/SingleSelectableList';
import { Link } from 'react-router-dom';
import NextButton from '../../Layout/NextButton';


const DimensionPage = (prop) => {

  const [personaLength, setPersonaLength] = React.useState(["0 - 100 words", "100 - 200 words", "200 -300 words"]);
  const [approch, setApproach] = React.useState(["Narrative Approach", "Bullet - Point Approach"]);
  const [structure, setStructure] = React.useState(["Unstructured", "Semi-Structured", "Structured"]);

  const [selectedPersonaLength, setSelectedPersonaLength] = React.useState(personaLength[0]);
  const [selectedApproach, setSelectedApproach] = React.useState(approch[0]);
  const [selectedStructure, setSelectedStructure] = React.useState(structure[0]);



  React.useEffect(() => {
    const storedPersonaLength = sessionStorage.getItem('selectedPersonaLength');
    const storedApproach = sessionStorage.getItem('selectedApproach');
    const storedStructure = sessionStorage.getItem('selectedStructure');

    if (storedPersonaLength) setSelectedPersonaLength(JSON.parse(storedPersonaLength));
    if (storedApproach) setSelectedApproach(JSON.parse(storedApproach));
    if (storedStructure) setSelectedStructure(JSON.parse(storedStructure));

  }, []);


  React.useEffect(() => {
    sessionStorage.setItem('selectedPersonaLength', JSON.stringify(selectedPersonaLength));
    sessionStorage.setItem('selectedApproach', JSON.stringify(selectedApproach));
    sessionStorage.setItem('selectedStructure', JSON.stringify(selectedStructure));
  }, [selectedPersonaLength, selectedApproach, selectedStructure]);



  const handlePersonaLengthToggle = (value) => {
    setSelectedPersonaLength(value);

  };

  const handleApproachToggle = (value) => {
    setSelectedApproach(value);

  };

  const handleStructureToggle = (value) => {
    setSelectedStructure(value);

  };


  console.log(selectedPersonaLength);
  console.log(selectedApproach);
  console.log(selectedStructure);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Header />
      <Container maxWidth="xl">

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start">

          <Grid item container sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8} >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Length</Typography>
              </Grid>
            </Grid>
          </Grid>

          <SingleSelectableList SelectableList itemList={personaLength} selectedItems={selectedPersonaLength} handleToggle={handlePersonaLengthToggle} />

          <Grid item container sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8} >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Narration</Typography>
              </Grid>
            </Grid>
          </Grid>

          <SingleSelectableList SelectableList itemList={approch} selectedItems={selectedApproach} handleToggle={handleApproachToggle} />

          <Grid item container sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8} >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Structure</Typography>
              </Grid>
            </Grid>
          </Grid>

          <SingleSelectableList SelectableList itemList={structure} selectedItems={selectedStructure} handleToggle={handleStructureToggle} />



          <Grid item container sx={{ m: 3 }}>

            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >

              <Grid item xs={8} >
                <Link to='/domainAndFactor'>
                  <NextButton name="Back" />
                </Link>

              </Grid>
              {selectedPersonaLength && selectedApproach && selectedStructure && selectedApproach === approch[0] && (
                <div>
                  <Link to='/narrativePersona'>
                    <NextButton name="Next" />
                  </Link>
                </div>
              )}

              {selectedPersonaLength && selectedApproach && selectedStructure && selectedApproach === approch[1] && (
                <div>
                  <Link to='/bulletPointPersona'>
                    <NextButton name="Next" />
                  </Link>
                </div>
              )}

            </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
  );

};


export default DimensionPage;




