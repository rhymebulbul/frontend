import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const NewDomainDialog = ({ addNewDomain }) => {
  const [open, setOpen] = React.useState(false);
  const [newDomainName, setNewDomainName] = React.useState(""); // New state variable

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

    console.log(newDomainName);
    addNewDomain(newDomainName);
    handleClose();
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
