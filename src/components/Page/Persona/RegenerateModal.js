import React, { useState } from "react";
import { Grid, Container, Paper } from '@mui/material';
//import "./Modal.css";
import DividerText from "./DividerText";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import NextButton from "../../Layout/NextButton";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 650,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
};

export default function RegenerateModal({ disabled }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <NextButton name={"regenerate"} disabled={disabled} onClickCallback={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Option:
          </Typography>
          {/*Need TO link backend*/}
          <Box textAlign={'center'}>
            <Button ali>Regenerate all content</Button>
          </Box>
          <DividerText />
          <Box textAlign={'Center'}>
            <TextField
              multiline
              fullWidth
              type="text"
              id="content"
              label="Copy Paste Specific Content"
              variant="outlined"
              inputProps={{
                style: {
                  height: "400px",
                },
              }}
            />
            <Button>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}