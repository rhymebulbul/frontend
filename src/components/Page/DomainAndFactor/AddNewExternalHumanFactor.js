import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddNewExternalHumanFactor = ({ addNewExternalHumanFactor }) => {
  const [open, setOpen] = React.useState(false);
  const [newExHF, setNewExHF] = React.useState(""); // New state variable

  const handleClickOpen = () => {
    setNewExHF('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewExHF = () => {
    console.log(newExHF);
    addNewExternalHumanFactor(newExHF);
    handleClose();
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
