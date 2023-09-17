import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid, Container } from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import RegenerateModal from './RegenerateModal';
import { CircularProgress } from '@mui/material';


const NarrativePersonaPage = (props) => {

  const [edit, setEdit] = React.useState(false);

  const [selectedDomains, setSelectedDomains] = React.useState([]);
  const [extraDetails, setExtraDetails] = React.useState('');
  const [selectedExHF, setSelectedExHF] = React.useState([]);
  const [selectedInHF, setSelectedInHF] = React.useState([]);
  const [selectedPersonaLength, setSelectedPersonaLength] = React.useState('');
  const [selectedApproach, setSelectedApproach] = React.useState('narrative');
  const [selectedStructure, setSelectedStructure] = React.useState('unstructured');
  const [loading, setLoading] = React.useState(false);

  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchSessionData = () => {
      setSelectedDomains(JSON.parse(sessionStorage.getItem('selectedDomains') || '[]'));
      setExtraDetails(sessionStorage.getItem('extraDetails') || '');
      setSelectedExHF(JSON.parse(sessionStorage.getItem('selectedExHF') || '[]'));
      setSelectedInHF(JSON.parse(sessionStorage.getItem('selectedInHF') || '[]'));
      setSelectedPersonaLength(sessionStorage.getItem('selectedPersonaLength') || '');

      setDataLoaded(true);
    };

    fetchSessionData();
  }, []);


  const [persona, setPersona] = React.useState('');
  const [error, setError] = React.useState('');

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
      console.log(data);
      setPersona(data.persona);

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  React.useEffect(() => {
    if (dataLoaded) {
      const cleanedSelectedPersonaLength = selectedPersonaLength.replace(/^\"|\"$/g, '');
      generatePersona(selectedDomains, selectedInHF, selectedExHF, extraDetails, cleanedSelectedPersonaLength);
      console.log(persona);
    }
  }, [dataLoaded]);



  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);
  };



  const handleCopyClick = () => {
    navigator.clipboard.writeText(persona).then(() => {
      alert('Content copied to clipboard.');
    }).catch(err => {
      alert('Failed to copy text: ', err);
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
      pdf.save('InfoCard.pdf');
    });
  };

  const handleRenerateToggle = () => {

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
              <NextButton name={edit ? "Edit Mode ON" : "Edit Mode OFF"} onClickCallback={handleEdit} backgroundColourChange={true} />
            </Grid>


            <Grid item xs={2} >
              <NextButton name={"Export As PDF"} onClickCallback={captureAreaAndDownloadPDF} disabled={edit ? true : false} />
            </Grid>

            <Grid item xs={2}>
              <NextButton name={"Copy Content"} onClickCallback={handleCopyClick} disabled={edit ? true : false} />
            </Grid>

            <Grid item xs={2}>
              <RegenerateModal disabled={edit ? true : false} />
            </Grid>



            <Grid item xs={2} >
              <NextButton name={"Save"} style={{ fontsize: "10px" }} disabled={edit ? true : false} />
            </Grid>
          </Grid>
        </Grid>

        <div id="captureArea">
          {loading ? (
            <Grid
              container
              style={{ height: '100vh' }}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Grid>
          ) : (
            <InfoCard name={"Persona"} content={persona} editVisible={edit} removeVisible={false} setContent={setPersona} />
          )}
        </div>

      </Container>
    </div>
  );
};

export default NarrativePersonaPage;