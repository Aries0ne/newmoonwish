import { Box, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { useState } from 'react';
const Swastika = () => {
    const handleSubmit = () => {

    }
    return (
        <>
            <div>
                <Box>
                    <Button style={{ fontSize: '15px', marginTop: '13px', width: '220px' }} variant='contained' onClick={handleSubmit}>Login</Button>
                </Box>
            </div>
        </>
    )
}

export default Swastika