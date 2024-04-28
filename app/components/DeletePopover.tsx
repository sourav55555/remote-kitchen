import React, { useState } from 'react';
import { Button, Popover, Snackbar, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const DeleteConfirmationPopover = ({ onDelete }: { onDelete: any }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDelete();
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'delete-confirmation-popover' : undefined;

    return (
        <>
            <Button size="small"
                variant='contained'
                className='bg-red-700 hover:bg-red-600'
                endIcon={<DeleteOutlineOutlinedIcon />}
                style={{ textTransform: 'none' }} onClick={handleClick}
            >
                Delete
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '20px' }}>

                    <Typography>Delete the recipe?</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>

                        <Button
                            onClick={handleDelete}
                            variant="outlined"
                            size="small"
                            className='me-2'
                            color="error"
                            style={{ textTransform: 'none' }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            style={{ textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Popover>
        </>
    );
};

export default DeleteConfirmationPopover;
