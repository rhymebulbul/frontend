import React, { useState } from 'react';
import Button from '@mui/material/Button';

const NextButton = ({ name, onClickCallback, backgroundColourChange, disabled = false }) => {
  const [clicked, setClicked] = useState(false);


  const handleClick = () => {
    // If the button is disabled, do nothing
    if (disabled) return;

    // Execute the callback function passed as a prop
    if (onClickCallback) {
      onClickCallback();
    }

    // Toggle the clicked state for color change only if backgroundColourChange is true
    if (backgroundColourChange) {
      setClicked(!clicked);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={disabled}
      sx={{
        width: '200px',
        whitespace: 'nowrap',
        textalign: 'center',
        fontSize: '16px',
        padding: '0.7rem 1.7rem',
        borderRadius: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        backgroundColor: backgroundColourChange && clicked ? '#2E7BED' : '#FFFFFF',
        color: backgroundColourChange && clicked ? '#FFFFFF' : '#2E7BED',
        '&:hover': {
          backgroundColor: '#2E7BED',
          color: '#FFFFFF',
        },
      }}
    >
      {name}
    </Button>
  );
};

export default NextButton;
