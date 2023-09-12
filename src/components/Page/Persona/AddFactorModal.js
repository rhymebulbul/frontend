import React from "react";
import { Grid } from '@mui/material';
//import "./Modal.css";
import Header from "../../Layout/Header";
import NextButton from "../../Layout/NextButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddFactorModal({ disabled }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Grid item xs={2} >
        <NextButton name={"Add Factors"} onClickCallback={handleOpen} disabled={disabled} />
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Human Factor:
          </Typography>
          {/*Need TO link backend*/}
          <Box textAlign={'center'}>
            <Button ali>Select Factor</Button>
          </Box>
          <Box textAlign={'Center'}>
            <TextField
              fullWidth
              type="text"
              id="content"
              label="Description"
              variant="outlined"
              inputProps={{
                style: {
                  height: "400px",
                },
              }}
            />
            <Button>Add</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}