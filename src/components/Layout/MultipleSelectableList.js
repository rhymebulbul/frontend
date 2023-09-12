import React from 'react';
import { Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

const MultipleSelectableList = ({ itemList, selectedItems, handleToggle }) => {
  return (


    <Paper style={{ overflowX: 'auto' }}>
      <List style={{ display: 'flex', flexDirection: 'row' }}>
        {itemList.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem key={value} disablePadding >
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
                <ListItemText id={labelId} primary={value} style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>

  );
};

export default MultipleSelectableList;
