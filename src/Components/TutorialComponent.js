import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import '../Inauth/Tutorial/Tutorial.scss';

const TutorialComponent = (props) => {
    const { tutorial } = props
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component={'h2'} className='title'>Tutorial</Typography>
                </Grid>
            </Grid>

            <Box className='tutorial-flex'>
                {tutorial.map((tutorials, index) => (

                    <Box className='tutorial-item' key={index}>
                        <iframe src='https://www.youtube.com/embed/UyW_j6G7BlE' title={'none'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="" ></iframe>
                        <Box className='tutorialBy'>
                            <Typography component={'p'} className='tutorial-title'>{tutorials.title}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default TutorialComponent