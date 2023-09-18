import { Typography, Box, Alert } from '@mui/material';
import Header from '../../Layout/Header';
import NewDomainDialog from './NewDomain';
import * as React from 'react';
import AddNewExternalHumanFactor from './AddNewExternalHumanFactor';
import AddNewInternalHumanFactor from './AddNewInternalHumanFactor';
import MultipleSelectableList from '../../Layout/MultipleSelectableList';
import NextButton from '../../Layout/NextButton';
import { Link } from 'react-router-dom';
import DeleteItemsDialog from './DeleteItemsDialog';
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



const DomainAndFactorPage = () => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  const token = storedData && storedData.token;

  const [selectedDomains, setSelectedDomains] = React.useState([]);


  // get the default domain list from db
  const [defaultDomainList, setDefaultDomainList] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8081/api/domain/all")
      .then(res => res.json())
      .then(data => {
        const domainArray = data.domains;
        const domainNames = domainArray.map(domainObj => domainObj.domainName);
        setDefaultDomainList(domainNames);
        console.log("fetch domains successfully");
      })
      .catch(error => {
        console.error("There was a problem fetching the domains:", error);
      });
  }, []);



  // get the default Internal human factor list from db
  const [defaultInternalHumanFactor, setDefaultInternalHumanFactor] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8081/api/factor/internal")
      .then(res => res.json())
      .then(data => {
        const InternalFactorArray = data.factors;
        const factorsNames = InternalFactorArray.map(factorObj => factorObj.factorName);
        setDefaultInternalHumanFactor(factorsNames);
        console.log("fetch internal human factors successfully");
      })
      .catch(error => {
        console.error("There was a problem fetching the internal human factors:", error);
      });
  }, []);


  // get the default External human factor list from db
  const [defaultExternalHumanFactor, setDefaultExternalHumanFactor] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8081/api/factor/external")
      .then(res => res.json())
      .then(data => {
        const ExternalFactorArray = data.factors;
        const factorsNames = ExternalFactorArray.map(factorObj => factorObj.factorName);
        setDefaultExternalHumanFactor(factorsNames);
        console.log("fetch external human factors successfully");
      })
      .catch(error => {
        console.error("There was a problem fetching the internal human factors:", error);
      });
  }, []);


  // Get users added domain from db
  const [addedDomainList, setAddedDomainList] = React.useState([]);

  const fetchUserDomains = async () => {
    try {

      const response = await fetch(
        'http://localhost:8081/api/user/getDomains',
        {
          headers: {
            'Authorization': `Bearer ${token}` // Send token in Authorization header
          }
        }
      );

      const data = await response.json();
      if (data && Array.isArray(data)) {
        const domainNames = data.map(domainObj => domainObj.domainName); // Extract domainName from each object
        setAddedDomainList(domainNames);
      }

    } catch (error) {
      console.error("There was an error fetching the user domains:", error);
    }
  }


  // Get users added internal human factors from db

  const [addedInternalHumanFactor, setAddedInternalHumanFactor] = React.useState([]);

  const fetchUserInternalFactors = async () => {
    try {

      const response = await fetch(
        'http://localhost:8081/api/user/getInternalFactors',
        {
          headers: {
            'Authorization': `Bearer ${token}` // Send token in Authorization header
          }
        }
      );

      const data = await response.json();
      if (data && Array.isArray(data)) {
        const factorNames = data.map(factorObj => factorObj.factorName); // Extract factorName from each object
        setAddedInternalHumanFactor(factorNames);
      }

    } catch (error) {
      console.error("There was an error fetching the user internal human factor:", error);
    }
  }



  // Get users added external human factors from db
  const [addedExternalHumanFactor, setAddedExternalHumanFactor] = React.useState([]);

  const fetchUserExternalFactors = async () => {
    try {

      const response = await fetch(
        'http://localhost:8081/api/user/getExternalFactors',
        {
          headers: {
            'Authorization': `Bearer ${token}` // Send token in Authorization header
          }
        }
      );

      const data = await response.json();
      if (data && Array.isArray(data)) {
        const factorNames = data.map(factorObj => factorObj.factorName); // Extract factorName from each object
        setAddedExternalHumanFactor(factorNames);
      }

    } catch (error) {
      console.error("There was an error fetching the user external human factor:", error);
    }
  }


  React.useEffect(() => {
    fetchUserDomains();
    fetchUserInternalFactors();
    fetchUserExternalFactors();
  }, []);






  const domainList = [...addedDomainList, ...defaultDomainList];
  const internalHumanFactor = [...addedInternalHumanFactor, ...defaultInternalHumanFactor];
  const externalHumanFactor = [...addedExternalHumanFactor, ...defaultExternalHumanFactor];



  const [selectedExHF, setSelectedExHF] = React.useState([]);
  const [selectedInHF, setSelectedInHF] = React.useState([]);
  const [extraDetails, setExtraDetails] = React.useState("");



  const handleToggle = (value) => () => {
    const currentIndex = selectedDomains.indexOf(value);
    const newselectedDomains = [...selectedDomains];

    if (currentIndex === -1) {
      newselectedDomains.push(value);
    } else {
      newselectedDomains.splice(currentIndex, 1);
    }

    setSelectedDomains(newselectedDomains);

  };


  const handleExHFToggle = (value) => () => {
    const currentIndex = selectedExHF.indexOf(value);
    const newselectedDomains = [...selectedExHF];

    if (currentIndex === -1) {
      newselectedDomains.push(value);
    } else {
      newselectedDomains.splice(currentIndex, 1);
    }

    setSelectedExHF(newselectedDomains);

  };

  const handleInHFToggle = (value) => () => {
    const currentIndex = selectedInHF.indexOf(value);
    const newselectedDomains = [...selectedInHF];

    if (currentIndex === -1) {
      newselectedDomains.push(value);
    } else {
      newselectedDomains.splice(currentIndex, 1);
    }

    setSelectedInHF(newselectedDomains);

  };

  const [domainAdded, setDomainAdded] = React.useState(false);
  const [internalFactorAdded, setInternalFactorAdded] = React.useState(false);
  const [externalFactorAdded, setExternalFactorAdded] = React.useState(false);


  React.useEffect(() => {
    if (domainAdded) {
      fetchUserDomains();
      // Reset the domainAdded state after fetching, if necessary.
      setDomainAdded(false);
    }
  }, [domainAdded]);

  const handleDomainAdded = (isAdded) => {
    if (isAdded) {
      setDomainAdded(true);
    }
  }


  React.useEffect(() => {
    if (internalFactorAdded) {
      fetchUserInternalFactors();
      // Reset the domainAdded state after fetching, if necessary.
      setInternalFactorAdded(false);
    }
  }, [internalFactorAdded]);



  const handleInHFAdded = (isAdded) => {
    if (isAdded) {
      setInternalFactorAdded(true);
    }
  }

  React.useEffect(() => {
    if (externalFactorAdded) {
      fetchUserExternalFactors();

      setExternalFactorAdded(false);
    }
  }, [externalFactorAdded]);


  const handleExHFAdded = (isAdded) => {
    if (isAdded) {
      setExternalFactorAdded(true);
    }
  }


  React.useEffect(() => {
    const storedselectedDomains = sessionStorage.getItem('selectedDomains');
    const storedSelectedExHF = sessionStorage.getItem('selectedExHF');
    const storedSelectedInHF = sessionStorage.getItem('selectedInHF');
    const storedExtraDetails = sessionStorage.getItem('extraDetails');

    if (storedselectedDomains) setSelectedDomains(JSON.parse(storedselectedDomains));
    if (storedSelectedExHF) setSelectedExHF(JSON.parse(storedSelectedExHF));
    if (storedSelectedInHF) setSelectedInHF(JSON.parse(storedSelectedInHF));
    if (storedExtraDetails) setExtraDetails(storedExtraDetails);
  }, []);


  React.useEffect(() => {
    sessionStorage.setItem('selectedDomains', JSON.stringify(selectedDomains));
    sessionStorage.setItem('selectedExHF', JSON.stringify(selectedExHF));
    sessionStorage.setItem('selectedInHF', JSON.stringify(selectedInHF));
    sessionStorage.setItem('extraDetails', extraDetails);
  }, [selectedDomains, selectedExHF, selectedInHF, extraDetails]);



  console.log(selectedDomains);
  console.log(selectedExHF);
  console.log(selectedInHF);
  console.log(extraDetails);

  return (
    <>
      <Header></Header>
      <Box sx={{ m: 2 }} >
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">

          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1 }}>Select Domain</Typography>
            <Box display="flex" >
              <Box mr={2}>
                <NewDomainDialog onDomainAdded={handleDomainAdded} />
              </Box>
              <DeleteItemsDialog
                title="Domains"
                items={addedDomainList}
                onItemsDeleted={setAddedDomainList}
                apiEndpoint="http://localhost:8081/api/user/deleteDomain"
                fetchData={fetchUserDomains}
                varName="domainName"
              />
            </Box>
          </Box>

          <Box p={2}>
            <MultipleSelectableList itemList={domainList} selectedItems={selectedDomains} handleToggle={handleToggle} />
          </Box>

          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>Select Human Factor ( Internal )</Typography>
            <Box display="flex" >
              <Box mr={2}>
                <AddNewInternalHumanFactor onInternalFactorAdded={handleInHFAdded} />
              </Box>
              <DeleteItemsDialog
                title="Internal Factors"
                items={addedInternalHumanFactor}
                onItemsDeleted={setAddedInternalHumanFactor}
                apiEndpoint="http://localhost:8081/api/user/deleteInternalFactor"
                fetchData={fetchUserInternalFactors}
                varName="factorName"
              />
            </Box>
          </Box>

          <Box p={2}>
            <MultipleSelectableList itemList={internalHumanFactor} selectedItems={selectedInHF} handleToggle={handleInHFToggle} />
          </Box>

          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>Select Human Factor ( External )</Typography>
            <Box display="flex" >
              <Box mr={2}>
                <AddNewExternalHumanFactor onExternalFactorAdded={handleExHFAdded} />
              </Box>
              <DeleteItemsDialog
                title="External Factors"
                items={addedExternalHumanFactor}
                onItemsDeleted={setAddedExternalHumanFactor}
                apiEndpoint="http://localhost:8081/api/user/deleteExternalFactor"
                fetchData={fetchUserExternalFactors}
                varName="factorName"
              />
            </Box>
          </Box>

          <Box p={2}>
            <MultipleSelectableList itemList={externalHumanFactor} selectedItems={selectedExHF} handleToggle={handleExHFToggle} />
          </Box>



          <Box display="flex" flexDirection="column" p={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>Specify any details you want to focus on</Typography>

            <textarea
              style={textareaStyles}
              id="fullWidth"
              rows={2}
              placeholder="Example: I want to set the age as 68 years old; I want to set the gender as female;"
              onChange={(e) => { setExtraDetails(e.target.value) }}
              value={extraDetails}
            ></textarea>

          </Box>

          <Box display="flex" justifyContent="center">
            {selectedExHF.length > 0 && selectedInHF.length > 0 && selectedDomains.length > 0 && (
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