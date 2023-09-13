import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const InfoCard = ({ title, content, editVisible, removeVisible, onDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [cardText, setCardText] = useState(content);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCardText(newText);
  };

  const handleRemoveClick = () => {
    if (onDelete) {
      onDelete();  // Notify the parent component about the deletion
    }
  };

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          {isEditable ? (
            <TextField
              fullWidth
              multiline
              variant="outlined"
              value={cardText}
              onChange={handleTextChange}
            />
          ) : (
            <Typography variant="body2" sx={{ lineHeight: 1.7, letterSpacing: 1, textAlign: 'justify', wordWrap: 'break-word' }}>{cardText}</Typography>
          )}
        </CardContent>
        <CardActions>
          {editVisible && (
            <Button size="small" onClick={handleEditClick}>
              {isEditable ? 'Save' : 'Edit'}
            </Button>
          )}
          {removeVisible && (
            <Button size="small" onClick={handleRemoveClick}>
              Remove
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

export default InfoCard;
