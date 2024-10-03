import { Box, Grid, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { angleValidation } from '../../../validation/broker';
import { finvasiaLogin } from '../../../redux/actions/brokerAction';
const Finvasia = () => {
    const inputFields = { userId: "", password: "", totp: "" }
    const [fields, setFields] = useState(inputFields)
    const [Error, setError] = useState()
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputBorder = {
        borderRadius: '5px',
        border: '1px solid #bcbcbc',
    };
    const handleChange = (event) => {
        const keyName = event.target.name
        const keyValue = event.target.value
        setFields((prevState) => ({
            ...prevState,
            [keyName]: keyValue
        }))
        if (isSubmit) {
            setError(angleValidation({ ...fields, [keyName]: keyValue }))
        }
    }

    const handleSubmit = () => {
        setIsSubmit(true)
        setError(angleValidation(fields))
        const error = angleValidation(fields)
        if (Object.keys(error)) {
            dispatch(finvasiaLogin(fields, navigate))
        }
    }

    return (
        <>
            <div className="border">
                <Box>
                    <Grid xs={12} lg={12}>
                        {/* <Box>
                            <Typography style={{ display: 'flex', justifyContent: 'center' }} component={'label'}>FINVASIA BROKER</Typography>
                            <hr style={{ color: '#26DE81', border: '2px solid' }} />
                        </Box> */}
                        <Box style={{ border: 'none' }} className='contactForm formBox'>
                            <Box className='formItems'>
                                <Typography component={'label'}>USER ID :</Typography>
                                <TextField
                                    placeholder='Enter User Id...'
                                    name='userId'
                                    className='inputFiled'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.userId}</div> : ""}
                            </Box>
                            <Box className='formItems'>
                                <Typography component={'label'}>PASSWORD :</Typography>
                                <TextField
                                    placeholder='Enter Password...'
                                    name='password'
                                    className='inputFiled'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.password}</div> : ""}
                            </Box>
                            <Box className='formItems'>
                                <Typography component={'label'}>TOTP :</Typography>
                                <TextField
                                    placeholder='Enter Totp...'
                                    name='totp'
                                    className='inputFiled'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.totp}</div> : ""}
                            </Box>
                            <Grid container style={{ display: 'flex', justifyContent: 'start' }}>
                                <Box>
                                    <Button style={{ fontSize: '15px', marginTop: '13px', width: '120px' }} variant='contained' onClick={handleSubmit}>Login</Button>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default Finvasia