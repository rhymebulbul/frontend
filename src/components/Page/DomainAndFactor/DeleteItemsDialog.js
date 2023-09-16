import * as React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DeleteItemsDialog({ title, items, onItemsDeleted, apiEndpoint, fetchData, varName }) {
    const [open, setOpen] = React.useState(false);
    const [currentItems, setCurrentItems] = React.useState(items); // Items list
    const [itemsToDelete, setItemsToDelete] = React.useState([]); // Items to delete
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData && storedData.token;


    React.useEffect(() => {
        setCurrentItems(items);
    }, [items]);

    console.log(currentItems);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleMarkForDeletion = (item) => {
        if (itemsToDelete.includes(item)) {
            setItemsToDelete((prev) => prev.filter((d) => d !== item));
        } else {
            setItemsToDelete((prev) => [...prev, item]);
        }
    };

    async function deleteItem(itemToDelete) {
        try {
            const response = await fetch(
                apiEndpoint,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // You'll need a way to access the token
                    },
                    body: JSON.stringify({ [varName]: itemToDelete })
                }
            );

            if (response.ok) {
                console.log("Item deleted successfully");
                fetchData(); // Refresh data
            } else {
                console.error("Error deleting item:", await response.text());
            }

        } catch (error) {
            console.error("There was an error deleting the item:", error);
        }
    }


    const handleSaveChanges = () => {
        // For every item to delete, call deleteItem
        itemsToDelete.forEach(item => {
            deleteItem(item);
        });

        const remainingItems = currentItems.filter((item) => !itemsToDelete.includes(item));
        setCurrentItems(remainingItems);
        onItemsDeleted && onItemsDeleted(remainingItems); // Inform parent
        handleClose();
        setItemsToDelete([]); // Clear the list

    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Delete Added {title}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle
                    sx={{ m: 0, p: 2, paddingRight: '100px' }}
                    id="customized-dialog-title"
                >
                    {title || "Delete Items"}
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {currentItems.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>No manually added {title}</p>
                    ) : (
                        currentItems.map((item, index) => (
                            <Chip
                                key={index}
                                label={item}
                                onDelete={() => handleMarkForDeletion(item)}
                                color={itemsToDelete.includes(item) ? "primary" : "default"}
                                style={{ marginRight: '8px', marginBottom: '8px' }}
                            />
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSaveChanges} disabled={itemsToDelete.length === 0} >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}
