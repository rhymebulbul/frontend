import Header from '../../Layout/Header';
import NextButton from '../../Layout/NextButton';
import { Grid, Box, Alert, Stack } from '@mui/material';
import InfoCard from '../../Layout/InfoCard';
import * as React from 'react';
import RegenerateModal from './RegenerateModal'
import AddFactorModal from './AddFactorModal';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
const BulletPointPersonaPage = (props) => {

    const [edit, setEdit] = React.useState(false);

    const [selectedDomains, setSelectedDomains] = React.useState([]);
    const [extraDetails, setExtraDetails] = React.useState('');
    const [selectedExHF, setSelectedExHF] = React.useState([]);
    const [selectedInHF, setSelectedInHF] = React.useState([]);
    const [selectedPersonaLength, setSelectedPersonaLength] = React.useState('');
    const [retryCount, setRetryCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [persona, setPersona] = React.useState(null);
    const [personaId, setPersonaId] = React.useState(null);
    const [error, setError] = React.useState('');

    const [alertConfig, setAlertConfig] = React.useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const normalizeKey = (key) => {
        return key.toLowerCase().replace(/\W/g, '');
    };

    const filterObjectByKeys = (obj, keys) => {
        const normalizedObjectKeys = Object.keys(obj).reduce((acc, key) => {
            acc[normalizeKey(key)] = key;
            return acc;
        }, {});

        return keys.reduce((acc, searchKey) => {
            const normalizedSearchKey = normalizeKey(searchKey);
            if (normalizedObjectKeys.hasOwnProperty(normalizedSearchKey)) {
                const originalKey = normalizedObjectKeys[normalizedSearchKey];
                acc[originalKey] = obj[originalKey];
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
        const cleanedSelectedPersonaLength = selectedPersonaLength.replace(/^\"|\"$/g, '');
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
            setRetryCount(0);
            const fullPersona = JSON.parse(data.persona);
            const relevantKeys = [...selectedExHF, ...selectedInHF];
            const filteredPersona = filterObjectByKeys(fullPersona, relevantKeys);
            setPersona(filteredPersona);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);

            // Retry mechanism
            if (retryCount < 3) {
                setRetryCount(prevCount => prevCount + 1);
                generatePersona(selectedDomains, selectedInHF, selectedExHF, extraDetails, cleanedSelectedPersonaLength);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    React.useEffect(() => {
        if (dataLoaded) {
            generatePersona(selectedDomains, selectedInHF, selectedExHF, extraDetails, selectedPersonaLength);
            console.log(persona);
        }
    }, [dataLoaded]);


    const handleDelete = (keyToDelete) => {
        setPersona(prevPersona => {
            const updatedPersona = { ...prevPersona };
            delete updatedPersona[keyToDelete];
            return updatedPersona;
        });
    }


    const handleCardSave = (keyToUpdate, newContent) => {
        setPersona(prevPersona => {
            return {
                ...prevPersona,
                [keyToUpdate]: newContent
            };
        });

        console.log("change " + persona);
    }

    const handleRegenerate = () => {
        setPersonaId(null);
        generatePersona(selectedDomains, selectedInHF, selectedExHF, extraDetails, selectedPersonaLength);
    };

    const handleEdit = () => {
        edit ? setEdit(false) : setEdit(true);
        console.log(persona);

    };

    const handleSave = async () => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        const token = storedData && storedData.token;

        const data = {
            domainName: selectedDomains,
            type: "bulletPoints",
            content: JSON.stringify(persona)
        };

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


    const handleAddFactor = (newTitle, newContent) => {
        setPersona(prevPersona => {
            return {
                ...prevPersona,
                [newTitle]: newContent
            };
        });
    };




    return (
        <div>
            <Header />
            <Box width="100%" maxWidth="1400px" mx="auto" overflow="hidden">


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

                        <AddFactorModal disabled={edit ? true : false} onAddFactor={handleAddFactor} />

                        <Grid item xs={2} >
                            <NextButton name={"Export As PDF "} disabled={edit ? true : false} />
                        </Grid>

                        <Grid item xs={2}>
                            <NextButton name={"Regenerate"} onClickCallback={handleRegenerate} disabled={edit ? true : false} />

                        </Grid>

                        <Grid item xs={2} >
                            <NextButton name={"Save"} onClickCallback={handleSave} disabled={edit ? true : false} />
                        </Grid>

                    </Grid>
                </Grid>


                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress />
                    </div>
                )}


                {!loading && (
                    <Grid container spacing={2} sx={{ m: 2 }} alignItems="stretch">
                        {persona && Object.entries(persona).reverse().map(([key, value], index) => (
                            <Grid item xs={4} key={key} style={{ display: 'flex', flexGrow: 1 }}>
                                <InfoCard
                                    title={key}
                                    content={value}
                                    editVisible={edit} // Pass the edit state
                                    removeVisible={edit}
                                    onDelete={() => handleDelete(key)}

                                    onSave={(newContent) => handleCardSave(key, newContent)}
                                />

                            </Grid>
                        ))}
                    </Grid>
                )}

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
            </Box>


        </div>
    );
};

export default BulletPointPersonaPage;