import React from "react";
import { Grid } from '@mui/material';
import NextButton from "../../Layout/NextButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1

};

export default function AddFactorModal({ disabled, onAddFactor }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newContent, setNewContent] = React.useState('');

  const handleAdd = () => {
    if (newTitle.trim() && newContent.trim()) {
      onAddFactor(newTitle, newContent);
      handleClose();
    }
  };


  return (
    <div>
      <Grid item xs={2} >
        <NextButton name={"Add Factors"} onClickCallback={handleOpen} disabled={disabled} />
      </Grid>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Human Factor:
          </Typography>
          {/*Need TO link backend*/}
          <Box textAlign={'center'}>
            <TextField
              fullWidth
              type="text"
              id="content"
              label="Title"
              variant="outlined"
              sx={{ mt: 4 }}
              inputProps={{
                style: {
                  height: "10px",
                },
              }}
              onChange={(e) => { setNewTitle(e.target.value) }}
            />

          </Box>
          <Box textAlign={'Center'}>
            <TextField
              fullWidth
              type="text"
              id="content"
              label="Description"
              variant="outlined"
              sx={{ mt: 4, mb: 4 }}
              inputProps={{
                style: {
                  height: "100px",
                },
              }}
              onChange={(e) => { setNewContent(e.target.value) }}
            />
            <Button onClick={handleAdd} color="primary" variant="contained">Add</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}