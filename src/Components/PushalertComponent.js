import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	FormControl,
	FormControlLabel,
	Grid,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import location from '../images/location.jpg';
import logoicon from '../images/logo-icon.png';
import { useSelector } from 'react-redux';
import { useSocket } from '../hooks/useNewSocket';

const PushalertComponent = (props) => {
	const [customer, setallcustomer] = useState('');
	const [broker, setallbroker] = useState('');
	const [allrecode, setrecode] = useState('');
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [fileName, setFileName] = useState();
	const [notificationTitle, setNotificationTitle] = useState('');
	const notificationSocket = useSocket('notification');


	const allcustomerdrp = (event) => {
		setallcustomer(event.target.value);
	};
	const allbrokerdrp = (event) => {
		setallbroker(event.target.value);
	};
	const recodedrp = (event) => {
		setrecode(event.target.value);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0]; // Assuming you only want to handle a single file
		if (file) {
			setFileName(file?.name || 'Image');
			const reader = new FileReader();

			reader.onload = (e) => {
				const base64 = e.target.result;
				setImageUrl(base64);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = () => {
		if (notificationSocket?.isConnected) {
			notificationSocket.sendMessage({
				type: 'notification_message',
				message: {
					title,
					customer,
					broker,
					imageUrl,
					notificationTitle,
				},
			});
		}
	};

	return (
		<>
			<Box className='formBox' sx={{ padding: { xs: '1em', md: '3rem' } }}>
				<Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
					<Grid item xs={12} md={6} lg={6}>
						<Grid
							container
							spacing={2}
							sx={{ justifyContent: 'space-between' }}
						>
							<Grid item xs={12} md={6}>
								<Box className='formItems'>
									<Typography component={'label'} className='label'>
										Customer
									</Typography>
									<FormControl className='dropdown-ap'>
										<Select
											value={customer}
											onChange={allcustomerdrp}
											displayEmpty
											className='dropdown'
										>
											<MenuItem value=''>Customer All</MenuItem>
											<MenuItem value={1}>Customer 1</MenuItem>
											<MenuItem value={2}>Customer 2</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Box className='formItems'>
									<Typography component={'label'} className='label'>
										Broker
									</Typography>
									<FormControl className='dropdown-ap'>
										<Select
											value={broker}
											onChange={allbrokerdrp}
											displayEmpty
											className='dropdown'
										>
											<MenuItem value=''>Broker All</MenuItem>
											<MenuItem value={1}>Broker 1</MenuItem>
											<MenuItem value={2}>Broker 2</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Box className='formItems'>
									<Typography component={'label'} className='label'>
										Referal Code
									</Typography>
									<FormControl className='dropdown-ap'>
										<Select
											value={allrecode}
											onChange={recodedrp}
											displayEmpty
											className='dropdown'
										>
											<MenuItem value=''>All</MenuItem>
											<MenuItem value={1}>132</MenuItem>
											<MenuItem value={2}>987</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Box className='formItems'>
									<Box className='inputFields space fullWidth'>
										<Typography component={'label'} className='label'>
											Title
										</Typography>
										<TextField
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder='Enter your title here'
										/>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={12}>
								<Box className='formItems'>
									<Box className='inputFields space fullWidth'>
										<Typography component={'label'} className='label'>
											Message
										</Typography>
										<TextField
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											multiline
											rows={4}
											placeholder='Enter Message Here'
										/>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Box className='formItems'>
									<Box className='inputFields space fullWidth'>
										<Typography component={'label'} className='label'>
											Title
										</Typography>
										<FormControl sx={{ display: 'block' }}>
											<RadioGroup
												row
												onChange={(e) => {
													setNotificationTitle(e.target.value);
												}}
											>
												<FormControlLabel
													value='Web'
													sx={{ marginRight: '2.5rem' }}
													control={<Radio />}
													label='Web'
												/>
												<FormControlLabel
													value='App'
													sx={{ marginRight: '2.5rem' }}
													control={<Radio />}
													label='App'
												/>
											</RadioGroup>
										</FormControl>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Box className='formItems'>
									<Typography component={'label'} className='label'>
										Upload Image
									</Typography>
									<Typography className='fileUpload' component={'label'}>
										<svg
											width='14'
											height='15'
											viewBox='0 0 14 15'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M1 8.3335V12.3335C1 13.0699 1.59695 13.6668 2.33333 13.6668H11.6667C12.4031 13.6668 13 13.0699 13 12.3335V8.3335'
												stroke='#8D8D8D'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M7.33333 10.3333V1M7.33333 1L4 4.62964M7.33333 1L10.6667 4.62963'
												stroke='#8D8D8D'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
										{fileName || 'Upload Image'}
										<TextField
											type='file'
											onChange={handleFileChange}
											inputProps={{
												accept: 'image/*',
											}}
											sx={{ marginRight: '2.5rem' }}
										/>
									</Typography>
								</Box>
							</Grid>

							<Button onClick={handleSubmit} className='formSolid-btn'>
								Submit
							</Button>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<Box className='notificationPreview'>
							<Typography component={'h4'} className='title'>
								Notification Preview
							</Typography>
							<Box className='pushAlert_preview app'>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='panel1a-content'
										id='panel1a-header'
									>
										<Typography>ExampleApp</Typography>
										<Typography>Now</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Card sx={{ border: 'none !important' }}>
											<CardHeader
												title='Shrimp and Chorizo Paella'
												subheader='Preview your app notification Preview your app notification'
											/>
											<CardMedia sx={{ height: 140 }} image={location} />
											<CardActions className='notificationAction'>
												<Button>Reply</Button>
												<Button>Ignore</Button>
												<Button>Cancle</Button>
											</CardActions>
										</Card>
									</AccordionDetails>
								</Accordion>
							</Box>

							<Box className='pushAlert_preview web'>
								<Card>
									<CardMedia sx={{ height: 140 }} image={location} />
									<CardContent>
										<Box className='noti-title'>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													width: '50%',
												}}
											>
												<svg
													viewBox='0 0 48 48'
													class='chrome'
													xmlns='http://www.w3.org/2000/svg'
													fill='currentColor'
												>
													<path
														fill-rule='evenodd'
														clip-rule='evenodd'
														d='M44.874 12.148C40.746 4.893 32.944 0 24 0 15.143 0 7.407 4.798 3.248 11.936l10.383 17.808A11.798 11.798 0 0112.147 24c0-6.546 5.306-11.852 11.852-11.852h20.875z'
														fill='#DB4437'
													></path>
													<path
														fill-rule='evenodd'
														clip-rule='evenodd'
														d='M23.933 48l10.334-18.073v-.002A11.847 11.847 0 0124 35.852a11.849 11.849 0 01-10.37-6.108L3.248 11.936A23.89 23.89 0 000 24c0 13.233 10.709 23.964 23.933 24z'
														fill='#0F9D58'
													></path>
													<path
														fill-rule='evenodd'
														clip-rule='evenodd'
														d='M48 24c0 13.255-10.745 24-24 24h-.067l10.334-18.074A11.8 11.8 0 0035.852 24c0-6.546-5.306-11.852-11.851-11.852h20.873A23.89 23.89 0 0148 24z'
														fill='#FFCD40'
													></path>
													<path
														fill-rule='evenodd'
														clip-rule='evenodd'
														d='M35.852 24c0 6.545-5.307 11.852-11.852 11.852-6.546 0-11.852-5.307-11.852-11.852 0-6.546 5.306-11.852 11.852-11.852 6.545 0 11.852 5.306 11.852 11.852zm-2.371 0a9.481 9.481 0 11-18.963 0 9.481 9.481 0 0118.963 0z'
														fill='#F1F1F1'
													></path>
													<path
														d='M24 33.481a9.481 9.481 0 100-18.962 9.481 9.481 0 000 18.962z'
														fill='#4285F4'
													></path>
												</svg>
												<Typography component={'p'}>Google Crome</Typography>
											</Box>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'end',
													width: '50%',
												}}
											>
												<MoreHorizIcon sx={{ marginLeft: 1.5 }} />
												<CloseIcon sx={{ marginLeft: 1.5 }} />
											</Box>
										</Box>

										<Box className='noti-message'>
											<img src={logoicon} />
											<Box className='message'>
												<Typography component={'h5'}>
													Notification Preview
												</Typography>
												<Typography component={'h4'}>
													Preview your push notification
												</Typography>
												<Typography component={'p'}>example.com</Typography>
											</Box>
										</Box>
									</CardContent>
									<CardActions className='notificationAction'>
										<Button>Reply</Button>
										<Button>Ignore</Button>
									</CardActions>
								</Card>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default PushalertComponent;
