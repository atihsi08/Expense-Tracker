import React from 'react';
import { Alert, Snackbar } from '@mui/material';

function CustomizedSnackbar({ open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Transaction Successfully Created
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CustomizedSnackbar;
