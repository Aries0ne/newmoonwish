import { Box, Grid, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { motilalValidation } from '../../../validation/broker';
import { useDispatch } from 'react-redux';
const MotilalOswal = () => {

    let inputFields = { userId: "" }
    const [fields, setFields] = useState(inputFields)
    const [isSubmit, setIsSubmit] = useState(false)
    const [Error, setError] = useState()
    const dispatch = useDispatch()
    const inputBorder = {
        borderRadius: '5px',
        border: '1px solid #bcbcbc',
    };

    const handleChange = (event) => {
        let keyName = event.target.name
        let keyValue = event.target.value
        setFields((prevState) => ({
            ...prevState,
            [keyName]: keyValue
        }))
        if (isSubmit) {
            setError(motilalValidation({ ...fields, [keyName]: keyValue }))
        }
    }

    const handleSubmit = () => {
        setIsSubmit(true)
        setError(motilalValidation(fields))
        let error = motilalValidation(fields)
        if (Object.keys(error) === 0) {
            // dispatch()
        }
    }
    return (
        <>
            <div className="border">
                <Box>
                    <Grid xs={12} lg={12}>
                        {/* <Box >
                            <Typography style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} component={'label'} className='label'>MOTILAL OSWAL BROKER</Typography>
                            <hr style={{ color: '#26DE81', border: '2px solid' }} />
                        </Box> */}
                        <Box sx={{ display: 'flex', border: 'none ' }} className='contactForm formBox'>
                            <Box className='formItems'>
                                <Typography component={'label'}>USER ID :</Typography>
                                <TextField
                                    placeholder='Enter User Id..'
                                    className='inputFiled'
                                    style={inputBorder}
                                    name="userId"
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.userId}</div> : ""}
                            </Box>
                            <Grid container
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid container style={{ display: 'flex', justifyContent: 'start' }}>
                                    <Box>
                                        <Button style={{ fontSize: '15px', marginTop: '13px', width: '120px' }} variant='contained' onClick={handleSubmit}>Login</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default MotilalOswal