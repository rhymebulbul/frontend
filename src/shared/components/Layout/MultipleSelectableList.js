import React from 'react';
import { Grid, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

const MultipleSelectableList = ({itemList, selectedItems, handleToggle, singleSelect  }) => {
  return (
    
    <Grid item container sx={{ m: 2 }}>
      <Paper style={{ maxHeight: 640, overflow: 'auto', width: '1760px' }}>
        <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }} sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {itemList.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem key={value} disablePadding style={{ maxWidth: '100%' }}>
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItems.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Grid>
  );
};

export default MultipleSelectableList;
