import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
const AddNewExternalHumanFactor = ({ onExternalFactorAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [newExHF, setNewExHF] = React.useState(""); // New state variable


  const addExternalHumanFactor = async (factorName) => {
    try {
      // Assuming you're storing the token in localStorage after user logs in.
      const storedData = JSON.parse(localStorage.getItem('userData'));
      const token = storedData && storedData.token;

      const response = await axios.post(
        'http://localhost:8081/api/user/addExternalFactor',
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
      console.error("There was an error adding the external human factor:", error);

    }
  }

  const handleClickOpen = () => {
    setNewExHF('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewExHF = () => {
    if (newExHF.trim() === '') {
      alert("Internal human factor name cannot be empty!");
      return;
    }
    addExternalHumanFactor(newExHF);
    handleClose();
    onExternalFactorAdded(true);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New External Human Factor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New External Human Factor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new external human factor, please enter it below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="exHFName"
            label="External Human Factor Name"
            type="text"
            fullWidth
            variant="standard"
            value={newExHF} // Make the input controlled
            onChange={(e) => setNewExHF(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewExHF}>Add New External Human Factor</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewExternalHumanFactor;
