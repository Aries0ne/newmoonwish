import { Box, Grid, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { kotakValidation } from '../../../validation/broker';
import { kotakLogin } from '../../../redux/actions/brokerAction';
const Kotak = () => {
    const inputFields = { userId: "", mobile: "", password: "", accessToken: "" }
    const [fields, setFields] = useState(inputFields)
    const [isSubmit, setIsSubmit] = useState(false)
    const [Error, setError] = useState()
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
            setError(kotakValidation({ ...fields, [keyName]: keyValue }))
        }
    }

    const handleSubmit = () => {
        setIsSubmit(true)
        setError(kotakValidation(fields))
        let error = kotakValidation(fields)
        if (Object.keys(error) === 0) {
            dispatch(kotakLogin(fields, navigate))
        }
    }
    return (
        <>
            <div className="border">
                <Box>
                    <Grid>
                        {/* <Box>
                            <Typography style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }} component={'label'} className='label'>KOTAK SECURITIES BROKER</Typography>
                            <hr style={{ color: '#26DE81', border: '2px solid' }} />
                        </Box> */}
                        <Box sx={{ display: 'flex', border: 'none ' }} className='contactForm formBox'>
                            <Box className='formItems'>
                                <Typography component={'label'}>USER ID :</Typography>
                                <TextField
                                    placeholder='Enter User Id...'
                                    className='inputFiled'
                                    name='userId'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.userId}</div> : ""}
                            </Box>
                            <Box className='formItems'>
                                <Typography component={'label'}>MOBILE :</Typography>
                                <TextField
                                    placeholder='Enter Mobile...'
                                    className='inputFiled'
                                    name='mobile'
                                    type='number'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.mobile}</div> : ""}
                            </Box>
                            <Box className='formItems'>
                                <Typography component={'label'}>PASSWORD :</Typography>
                                <TextField
                                    placeholder='Enter Password...'
                                    className='inputFiled'
                                    name='password'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.password}</div> : ""}
                            </Box>
                            <Box className='formItems'>
                                <Typography component={'label'}>ACCESSS TOKEN :</Typography>
                                <TextField
                                    placeholder='Enter Access Token...'
                                    className='inputFiled'
                                    name='accessToken'
                                    style={inputBorder}
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.accessToken}</div> : ""}
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
                                        <Button variant="contained" style={{ fontSize: '15px', marginTop: '13px', width: '120px' }} onClick={handleSubmit}>Login</Button>
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

export default Kotak