import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid , Container} from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import RegenerateModal from './RegenerateModal'
import AddFactorModal from './AddFactorModal';

const BulletPointPersonaPage = (props) => {

    const [edit,setEdit] = React.useState(false);


    const handleEdit = () => {
        edit ? setEdit(false) : setEdit(true);
    };
    
    return (
        <div>
        <Header/>
        <Container maxWidth="xl">
              <Grid item container  sx={{ m: 3 }}>

              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >

              <Grid item xs={2} >
                <NextButton name = {edit ? "Edit Mode ON" : "Edit Mode OFF"} onClickCallback = {handleEdit} backgroundColourChange = {true}/>
              </Grid>

              <AddFactorModal/>

              <Grid item xs={2} >
                <NextButton name = {"Export As PDF "} />
              </Grid>

              <Grid item xs={2} >
                <NextButton name = {"Save"} />
              </Grid>
              

              </Grid>
             </Grid>

            <Grid container spacing={3} sx={{m:3}}>
                <Grid item xs>
                <InfoCard title = {'testing'} content = {"hi"} editVisible= {edit} removeVisible = {edit}/>
            </Grid>
            <Grid item xs={6}>
                <InfoCard title = {'testing'} content = {"hi"} editVisible= {edit}removeVisible = {edit}/>

            </Grid>
            <Grid item xs>
                <InfoCard title = {'testing'} content = {"hi"} editVisible= {edit} removeVisible = {edit}/>
            </Grid>
            <Grid item xs>
                <InfoCard title = {'testing'} content = {"hi"} editVisible= {edit} removeVisible = {edit}/>
            </Grid>
            <Grid item xs>
                <InfoCard title = {'testing'} content = {"hi"} editVisible= {edit} removeVisible = {edit}/>
            </Grid>
            </Grid>

            <Grid item xs={2} >
                <RegenerateModal />
            </Grid>
        </Container>
        </div>
    );
};

export default BulletPointPersonaPage;