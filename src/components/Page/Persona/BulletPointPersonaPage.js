import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid, Container } from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import RegenerateModal from './RegenerateModal'
import AddFactorModal from './AddFactorModal';

const BulletPointPersonaPage = (props) => {

    const [edit, setEdit] = React.useState(false);

    const [cards, setCards] = React.useState([
        { id: 1, title: 'testing', content: 'hi' },
        { id: 2, title: 'testing', content: 'hi' },
        { id: 3, title: 'testing', content: 'hihihihihihhihihihihihhihihihihihhihihihihihhihihihihihhihihihihihhihihihihihhihihihihihhihihihihihhihihihihih' },
        { id: 4, title: 'testing', content: 'hi' },
        { id: 5, title: 'testing', content: 'hi' }
    ]);

    const handleDelete = (idToDelete) => {
        setCards(prevCards => prevCards.filter(card => card.id !== idToDelete));
    }




    const handleEdit = () => {
        edit ? setEdit(false) : setEdit(true);
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

                        <AddFactorModal disabled={edit ? true : false} />

                        <Grid item xs={2} >
                            <NextButton name={"Export As PDF "} disabled={edit ? true : false} />
                        </Grid>

                        <Grid item xs={2}>
                            <RegenerateModal disabled={edit ? true : false} />
                        </Grid>

                        <Grid item xs={2} >
                            <NextButton name={"Save"} disabled={edit ? true : false} />
                        </Grid>



                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ m: 3 }}>
                    {cards.map((card) => (
                        <Grid item xs key={card.id}>
                            <InfoCard
                                title={card.title}
                                content={card.content}
                                editVisible={edit}
                                removeVisible={edit}
                                onDelete={() => handleDelete(card.id)}
                            />
                        </Grid>
                    ))}
                </Grid>


            </Container>
        </div>
    );
};

export default BulletPointPersonaPage;