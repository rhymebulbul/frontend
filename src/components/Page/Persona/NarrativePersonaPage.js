import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid, Container } from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import RegenerateModal from './RegenerateModal';



const NarrativePersonaPage = (props) => {


  const [testing, setTesting] = React.useState(`Teresa is eight years old and is a third-grade student at St. Augustine Elementary School, a public school. She lives with her mother and father (Maria and Oscar Dieste) in a dormitory town around Madrid, Spain. Teresa has been using computers at school since kindergarten and has had her own computer at home for a year. She has very occasionally used the Internet at home to search for information related to her school work under her parents' supervision.
Even though Teresa loves to be physically active (she is a keen rhythmic gymnast, dancer and skateboarder), she thinks computers are really, really fun. She uses the Mac mostly to play princess games (dress-up, Dora the explorer, and so), and watch videos on iTunes. Santa Claus brought her a Nintendo DS® console last Christmas. Her current favourite is Cooking Mama 4, although she also likes educational games.
Teresa also loves TV so much so that her parents have decided to get rid of the only television set that they had at home. Instead they have a password-protected Boxee Box where Teresa can sometimes watch TV over IP. Teresa is not very happy about not having TV at home, but she did not like what her parents told about TV "eating your brain" and has stoically accepted. Her 4-year-old sister Alba goes nowhere near a TV since she heard that it could eat things.`);
  const [edit, setEdit] = React.useState(false);


  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const [cardContent, setCardContent] = React.useState(testing);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(cardContent).then(() => {
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
          <InfoCard name={"Persona"} content={testing} editVisible={edit} removeVisible={false} setContent={setCardContent} />
        </div>

      </Container>
    </div>
  );
};

export default NarrativePersonaPage;