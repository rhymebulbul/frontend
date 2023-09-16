import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios
  from 'axios';
const AddNewInternalHumanFactor = ({ onInternalFactorAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [newInHF, setNewInHF] = React.useState(""); // New state variable


  const addInternalHumanFactor = async (factorName) => {
    try {
      // Assuming you're storing the token in localStorage after user logs in.
      const storedData = JSON.parse(localStorage.getItem('userData'));
      const token = storedData && storedData.token;

      const response = await axios.post(
        'http://localhost:8081/api/user/addInternalFactor',
        { factorName },
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
      console.error("There was an error adding the internal human factor:", error);

    }
  }

  const handleClickOpen = () => {
    setNewInHF('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewInHF = () => {
    // Check if is empty or just whitespace
    if (newInHF.trim() === '') {
      alert("Internal human factor name cannot be empty!");
      return;
    }
    addInternalHumanFactor(newInHF);
    handleClose();
    onInternalFactorAdded(true);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Internal Human Factor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Internal Human Factor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new internal human factor, please enter it below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="internalHFName"
            label="Internal Human Factor Name"
            type="text"
            fullWidth
            variant="standard"
            value={newInHF} // Make the input controlled
            onChange={(e) => setNewInHF(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewInHF}>Add New Internal Human Factor</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewInternalHumanFactor;

