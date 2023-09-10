import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddNewInternalHumanFactor = ({addNewInHumanFactor}) => {
  const [open, setOpen] = React.useState(false);
  const [newInHF, setNewInHF] = React.useState(""); // New state variable

  const handleClickOpen = () => {
    setNewInHF('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewInHF = () =>{
    console.log (newInHF);
    addNewInHumanFactor (newInHF);
    handleClose();
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

