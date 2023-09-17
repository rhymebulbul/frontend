import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid, Box, Container } from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import RegenerateModal from './RegenerateModal'
import AddFactorModal from './AddFactorModal';
import { CircularProgress } from '@mui/material';

const BulletPointPersonaPage = (props) => {

    const [edit, setEdit] = React.useState(false);

    const [selectedDomains, setSelectedDomains] = React.useState([]);
    const [extraDetails, setExtraDetails] = React.useState('');
    const [selectedExHF, setSelectedExHF] = React.useState([]);
    const [selectedInHF, setSelectedInHF] = React.useState([]);
    const [selectedPersonaLength, setSelectedPersonaLength] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [dataLoaded, setDataLoaded] = React.useState(false);

    const filterObjectByKeys = (obj, keys) => {
        return keys.reduce((acc, key) => {
            if (obj.hasOwnProperty(key)) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    };

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


    const [persona, setPersona] = React.useState(null);

    const [error, setError] = React.useState('');

    const generatePersona = async (domains, internalFactors, externalFactors, extraDetails, length) => {
        setLoading(true); // Start loading
        const apiUrl = "http://localhost:8081/api/persona/generateStructuredPersona";
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
            const fullPersona = JSON.parse(data.persona);
            console.log(fullPersona);
            const relevantKeys = [...selectedExHF, ...selectedInHF];
            console.log(relevantKeys);
            const filteredPersona = filterObjectByKeys(fullPersona, relevantKeys);
            setPersona(filteredPersona);
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





    const handleDelete = (idToDelete) => {

    }




    const handleEdit = () => {
        edit ? setEdit(false) : setEdit(true);
    };

    return (
        <div>
            <Header />
            <Box width="100%" maxWidth="1300px" mx="auto" overflow="hidden">
                <Grid item container sx={{ m: 2, overflow: 'hidden' }}>

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



                        <Grid container spacing={1} sx={{ m: 3 }} alignItems="stretch">
                            {persona && Object.entries(persona).map(([key, value], index) => (
                                <Grid item xs key={index} style={{ display: 'flex' }}>
                                    <InfoCard
                                        title={key}
                                        content={value}
                                        editVisible={edit}
                                        removeVisible={edit}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                    </Grid>
                </Grid>
            </Box>


        </div>
    );
};

export default BulletPointPersonaPage;