import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
const NewDomainDialog = ({ onDomainAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [newDomainName, setNewDomainName] = React.useState(""); // New state variable

  const addDomain = async (domainName) => {
    try {
      // Assuming you're storing the token in localStorage after user logs in.
      const storedData = JSON.parse(localStorage.getItem('userData'));
      const token = storedData && storedData.token;

      const response = await axios.post(
        'http://localhost:8081/api/user/addDomain',
        { domainName },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Send token in Authorization header
          }
        }
      );

      // If the request is successful:
      console.log(response.data);

    } catch (error) {
      console.error("There was an error adding the domain:", error);

    }
  }


  const handleClickOpen = () => {
    setNewDomainName('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewDomain = () => {
    // Check if newDomainName is empty or just whitespace
    if (newDomainName.trim() === '') {
      alert("Domain name cannot be empty!");
      return;
    }
    addDomain(newDomainName);
    handleClose();

    onDomainAdded(true);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Domain
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Domain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new domain, please enter its name below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="domainName"
            label="Domain Name"
            type="text"
            fullWidth
            variant="standard"
            value={newDomainName} // Make the input controlled
            onChange={(e) => setNewDomainName(e.target.value)} // Update newDomainName
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewDomain}>Add Domain</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewDomainDialog;
