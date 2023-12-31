import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid, Container, Chip, Box, Alert, Stack } from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
const renderChips = (items, label) => {
  if (!items || !items.length) return null;

  return (
    <Box m={2}>
      <strong>{label} :</strong>
      {items.map((item, index) => (
        <Chip key={index} label={item} variant="outlined" style={{ margin: '0 4px' }} />
      ))}
    </Box>
  );
};
const NarrativePersonaPage = (props) => {
  const { personaId: urlPersonaId } = useParams();

  const [edit, setEdit] = React.useState(false);

  const [selectedDomains, setSelectedDomains] = React.useState([]);
  const [extraDetails, setExtraDetails] = React.useState('');
  const [selectedExHF, setSelectedExHF] = React.useState([]);
  const [selectedInHF, setSelectedInHF] = React.useState([]);
  const [selectedPersonaLength, setSelectedPersonaLength] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [dataLoaded, setDataLoaded] = React.useState(false);

  const [alertConfig, setAlertConfig] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [persona, setPersona] = React.useState('');
  const [error, setError] = React.useState('');

  const [personaId, setPersonaId] = React.useState(null);
  React.useEffect(() => {
    const fetchSessionData = () => {
      setSelectedDomains(JSON.parse(sessionStorage.getItem('selectedDomains') || '[]'));
      setExtraDetails(sessionStorage.getItem('extraDetails') || '');
      setSelectedExHF(JSON.parse(sessionStorage.getItem('selectedExHF') || '[]'));
      setSelectedInHF(JSON.parse(sessionStorage.getItem('selectedInHF') || '[]'));
      setSelectedPersonaLength(sessionStorage.getItem('selectedPersonaLength') || '');

      setDataLoaded(true);
    };

    if (!urlPersonaId) { fetchSessionData() };
  }, []);


  const generatePersona = async (domains, internalFactors, externalFactors, extraDetails, length) => {
    setLoading(true); // Start loading
    const apiUrl = "http://localhost:8081/api/persona/generateNarrativePersona";
    const domainsStr = domains.join(", ");
    const internalFactorsStr = internalFactors.join(", ");
    const externalFactorsStr = externalFactors.join(", ");
    const bodyData = {
      domains: domainsStr,
      internalFactors: internalFactorsStr,
      externalFactors: externalFactorsStr,
      extraDetails,
      length
    };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setPersona(data.persona);

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading

    }
  };

  const fetchPersonaById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8081/api/persona/narrativePersona/${id}`);
      if (response.data && response.data.content) {

        setPersona(response.data.content);
        setPersonaId(id);
        setSelectedDomains(response.data.domainName);
        setSelectedExHF(response.data.externalFactors);
        setSelectedInHF(response.data.internalFactors);

      } else {
        setError('Failed to fetch persona');
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (urlPersonaId) {
      // If a persona ID is provided in the URL, fetch that persona
      fetchPersonaById(urlPersonaId);
      console.log(persona);
    } else if (dataLoaded) {
      // Otherwise, if data is loaded from session, generate a new persona
      const cleanedSelectedPersonaLength = selectedPersonaLength.replace(/^\"|\"$/g, '');
      generatePersona(selectedDomains, selectedInHF, selectedExHF, extraDetails, cleanedSelectedPersonaLength);
    }
  }, [dataLoaded, urlPersonaId]);


  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);

  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(persona).then(() => {
      setAlertConfig({
        open: true,
        message: 'Content copied to clipboard.',
        severity: 'success'
      });

      setTimeout(() => {
        setAlertConfig(prevState => ({ ...prevState, open: false }));
      }, 3000);

    }).catch(err => {
      setAlertConfig({
        open: true,
        message: 'Failed to copy text.',
        severity: 'error'
      });

      setTimeout(() => {
        setAlertConfig(prevState => ({ ...prevState, open: false }));
      }, 3000);
    });
  };


  const captureAreaAndDownloadPDF = () => {

    const input = document.getElementById('captureArea'); // The ID of the div wrapping your InfoCard

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape

      // Define your PDF's page dimensions (A4 landscape)
      const pdfPageWidth = 297;
      const pdfPageHeight = 210;

      // Calculate aspect ratios for the PDF page and the image
      const pdfAspectRatio = pdfPageWidth / pdfPageHeight;
      const imgAspectRatio = canvas.width / canvas.height;

      let imgWidth, imgHeight;

      // Calculate the dimensions of the image, preserving aspect ratio,
      // to fit within the dimensions of the PDF page
      if (imgAspectRatio > pdfAspectRatio) {
        imgWidth = pdfPageWidth;
        imgHeight = pdfPageWidth / imgAspectRatio;
      } else {
        imgHeight = pdfPageHeight;
        imgWidth = pdfPageHeight * imgAspectRatio;
      }

      // Position the image in the center of the page
      const x = (pdfPageWidth - imgWidth) / 2;
      const y = (pdfPageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('Persona .pdf');
    });
  };

  const handleRenerate = () => {
    setPersonaId(null);
    const cleanedSelectedPersonaLength = selectedPersonaLength.replace(/^\"|\"$/g, '');
    generatePersona(selectedDomains, selectedInHF, selectedExHF, extraDetails, cleanedSelectedPersonaLength);

  };

  const handleSave = async () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData && storedData.token;

    const data = {
      domainName: selectedDomains,
      type: "narrative",
      content: persona,
      internalFactors: selectedInHF,
      externalFactors: selectedExHF
    };

    console.log(data);

    try {
      let response;
      if (personaId) {
        // If personaId exists, update the existing persona
        response = await axios.put(`http://localhost:8081/api/persona/${personaId}`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // If personaId does not exist, create a new persona
        response = await axios.post('http://localhost:8081/api/persona/add', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }

      if (response.data && response.data.personaId) {
        setPersonaId(response.data.personaId);
        console.log("Saved Persona ID:", response.data.personaId);
      }
      setAlertConfig({
        open: true,
        message: 'Persona saved successfully!',
        severity: 'success'
      });

      setTimeout(() => {
        setAlertConfig(prevState => ({ ...prevState, open: false }));
      }, 3000);
    } catch (error) {
      console.log(error);

      // Update alertConfig for other errors
      setAlertConfig({
        open: true,
        message: 'Error while saving the persona. Please try again.',
        severity: 'error'
      });

      setTimeout(() => {
        setAlertConfig(prevState => ({ ...prevState, open: false }));
      }, 3000);
    }
  };



  return (
    <div>
      <Header />
      <Container maxWidth="xl">

        <Grid item container sx={{ m: 3 }}>

          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >

            <Grid item xs={2} >
              <NextButton name={edit ? "Edit MOde On" : "Edit Mode"} onClickCallback={handleEdit} backgroundColourChange={true} disabled={loading} />
            </Grid>


            <Grid item xs={2} >
              <NextButton name={"Export As PDF"} onClickCallback={captureAreaAndDownloadPDF} disabled={edit ? true : loading} />
            </Grid>

            <Grid item xs={2}>
              <NextButton name={"Copy Content"} onClickCallback={handleCopyClick} disabled={edit ? true : loading} />
            </Grid>

            <Grid item xs={2}>
              <NextButton name={"Regenerate"} onClickCallback={handleRenerate} disabled={edit || urlPersonaId ? true : loading} />
            </Grid>

            <Grid item xs={2}>
              <NextButton name={"Save"} onClickCallback={handleSave} disabled={edit ? true : loading} />
            </Grid>

          </Grid>
        </Grid>



        <div id="captureArea">

          <Box width="100%" display="flex" flexDirection="column" alignItems="center">
            <Box width="80%">
              {renderChips(selectedDomains, "Selected Domains")}
              {renderChips(selectedExHF, "External Human Factors")}
              {renderChips(selectedInHF, "Internal Human Factors")}
            </Box>
            {loading ? (
              <Grid container style={{ height: '50vh' }} justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <InfoCard name={"Persona"} content={persona} editVisible={edit} removeVisible={false} onSave={setPersona} />
              </>
            )}

          </Box>

        </div>

        {alertConfig.open && (
          <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
            <Alert
              variant="filled"
              severity={alertConfig.severity}
              onClose={() => setAlertConfig({ ...alertConfig, open: false })}
            >
              {alertConfig.message}
            </Alert>
          </Stack>
        )}


      </Container>
    </div>
  );
};

export default NarrativePersonaPage;