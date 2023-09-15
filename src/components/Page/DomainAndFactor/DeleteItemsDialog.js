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

export default function DeleteItemsDialog({ title, items, onItemsDeleted }) {
    const [open, setOpen] = React.useState(false);
    const [currentItems, setCurrentItems] = React.useState(items); // Items list
    const [itemsToDelete, setItemsToDelete] = React.useState([]); // Items to delete

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

    const handleSaveChanges = () => {
        const remainingItems = currentItems.filter((item) => !itemsToDelete.includes(item));
        setCurrentItems(remainingItems);
        onItemsDeleted && onItemsDeleted(remainingItems); // Inform parent
        setItemsToDelete([]); // Clear the list
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Delete Items
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
                <DialogContent dividers>
                    {currentItems.map((item, index) => (
                        <Chip
                            key={index}
                            label={item}
                            onDelete={() => handleMarkForDeletion(item)}
                            color={itemsToDelete.includes(item) ? "primary" : "default"}
                            style={{ marginRight: '8px', marginBottom: '8px' }}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSaveChanges}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
