import React, { useState } from 'react';
import {
	Box,
	Grid,
	Typography,
	List,
	ListItem,
	TextField,
	InputBase,
} from '@mui/material';
import contactbg from '../images/contact-bg.jpeg';
import '../Inauth/Contact/Contact.scss';
import { sendContactMessage } from '../redux/actions/authActions';

const ContactComponent = (props) => {
	const { profileData } = props;
	const [message, setMessage] = useState();
	const [msgError, setMsgError] = useState(false);
	// const inputFiled = {
	//     width: {
	//         xs: '100% !important',
	//         md: 'calc(50% - 1rem ) !important'
	//     },
	//     padding: {
	//         xs: '0',
	//         md: '0 0.5rem'
	//     }
	// }

	const handleSendMessage = () => {
		if (!message || message?.length < 31 || message?.length > 300) {
			setMsgError(true);
			return;
		}
		const obj = {
			firstname: profileData[0]?.firstname,
			lastname: profileData[0]?.lastname,
			email: profileData[0]?.email,
			phone: profileData[0]?.phone,
			message,
		};

		sendContactMessage(obj);
	};

	return (
		<>
			<Box className='contactDetails-box'>
				<Grid container spacing={2} sx={{ marginBottom: '5rem' }}>
					<Grid item xs={12}>
						<Typography component={'h2'}>Contact us</Typography>
						<Typography component={'p'}>
							Any question or remarks? Just write us a message!
						</Typography>
					</Grid>
				</Grid>
				<Box className='border-ap' sx={{ padding: '1rem' }}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={5}>
							<Box className='contactForm-bg'>
								<img src={contactbg} />
								<Typography component={'h2'} className='text-white'>
									Contact Information
								</Typography>
								<Typography component={'p'} className='text-white'>
									Say something to start a live chat!
								</Typography>
								<List className='contactDetails'>
									<ListItem className='contactDetails-item'>
										<svg
											width='26'
											height='26'
											viewBox='0 0 26 26'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M21.6053 11.882H23.7658C23.7658 6.3402 19.582 2.16064 14.0326 2.16064V4.32118C18.4207 4.32118 21.6053 7.50041 21.6053 11.882Z'
												fill='#ffffff'
											/>
											<path
												d='M14.0435 8.64207C16.3153 8.64207 17.2843 9.61107 17.2843 11.8829H19.4448C19.4448 8.39901 17.5273 6.48154 14.0435 6.48154V8.64207ZM17.7402 14.522C17.5326 14.3333 17.2598 14.2327 16.9794 14.2413C16.6991 14.25 16.433 14.3673 16.2375 14.5684L13.6524 17.227C13.0302 17.1081 11.7792 16.7182 10.4916 15.4337C9.20388 14.145 8.8139 12.8908 8.69831 12.2729L11.3547 9.68669C11.5561 9.4913 11.6735 9.22522 11.6822 8.94477C11.6909 8.66432 11.5901 8.3915 11.4011 8.18404L7.40955 3.79491C7.22055 3.58681 6.95787 3.46057 6.67729 3.44303C6.39672 3.42548 6.12036 3.518 5.9069 3.70093L3.56272 5.71131C3.37595 5.89875 3.26448 6.14822 3.24944 6.4124C3.23324 6.68247 2.92428 13.0798 7.88487 18.0426C12.2124 22.369 17.6332 22.6856 19.1261 22.6856C19.3443 22.6856 19.4783 22.6791 19.5139 22.6769C19.7781 22.6621 20.0274 22.5502 20.214 22.3626L22.2233 20.0173C22.4063 19.804 22.499 19.5277 22.4817 19.2471C22.4643 18.9665 22.3383 18.7038 22.1304 18.5146L17.7402 14.522Z'
												fill='#ffffff'
											/>
										</svg>
									</ListItem>
									<ListItem className='contactDetails-item'>
										<Typography component={'p'} className='text-white'>
											+91 8828880082
										</Typography>
										{/* <Typography component={'p'} className='text-white'>+91 9321446622</Typography>
										<Typography component={'p'} className='text-white'>+91 9321446633</Typography> */}
									</ListItem>
								</List>

								<List className='contactDetails'>
									<ListItem className='contactDetails-item'>
										<svg
											width='26'
											height='26'
											viewBox='0 0 26 26'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M23.7658 4.3208H2.16049V21.6051H23.7658V4.3208ZM21.6053 8.64187L12.9632 14.0432L4.32103 8.64187V6.48134L12.9632 11.8827L21.6053 6.48134V8.64187Z'
												fill='#ffffff'
											/>
										</svg>
									</ListItem>
									<ListItem className='contactDetails-item'>
										<Typography component={'p'} className='text-white'>
											support@mooonwishsolution.com
										</Typography>
									</ListItem>
								</List>

								<List className='contactDetails'>
									<ListItem className='contactDetails-item'>
										<svg
											width='26'
											height='26'
											viewBox='0 0 26 26'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M12.9122 2C10.5494 2.00279 8.28417 2.94264 6.61341 4.6134C4.94265 6.28416 4.0028 8.5494 4.00001 10.9122C3.99718 12.8431 4.6279 14.7216 5.79541 16.2595C5.79541 16.2595 6.03847 16.5796 6.07817 16.6257L12.9122 24.6856L19.7495 16.6217C19.7851 16.5788 20.029 16.2595 20.029 16.2595L20.0298 16.2571C21.1968 14.7198 21.8272 12.8422 21.8244 10.9122C21.8216 8.5494 20.8818 6.28416 19.211 4.6134C17.5403 2.94264 15.275 2.00279 12.9122 2ZM12.9122 14.153C12.2712 14.153 11.6447 13.9629 11.1117 13.6068C10.5788 13.2507 10.1634 12.7446 9.91811 12.1524C9.67282 11.5602 9.60864 10.9086 9.73369 10.28C9.85873 9.6513 10.1674 9.07385 10.6206 8.62061C11.0739 8.16738 11.6513 7.85872 12.28 7.73368C12.9086 7.60863 13.5602 7.67281 14.1524 7.9181C14.7446 8.16338 15.2507 8.57877 15.6068 9.11171C15.9629 9.64466 16.153 10.2712 16.153 10.9122C16.1519 11.7714 15.8102 12.5951 15.2026 13.2026C14.5951 13.8102 13.7714 14.1519 12.9122 14.153Z'
												fill='#ffffff'
											/>
										</svg>
									</ListItem>
									<ListItem className='contactDetails-item'>
										<Typography component={'p'} className='text-white'>
											10th Floor, Fairmount, Plot No. 4, Sector 17, Palm Beach
											Road, Sanpada, 400705.
										</Typography>
									</ListItem>
								</List>
							</Box>
						</Grid>
						<Grid item xs={12} lg={7}>
							<Grid container spacing={2} className='contactForm formBox'>
								<Grid item xs={12} sm={6} className='formItems'>
									<Box
										className='inputFields space fullWidth'
										sx={{ margin: '0 !important' }}
									>
										<Typography component={'label'} className='label'>
											First Name
										</Typography>
										<InputBase
											placeholder='First Name'
											id='FirstName'
											value={profileData[0]?.firstname}
											disabled
										/>
									</Box>
								</Grid>

								<Grid item xs={12} sm={6} className='formItems'>
									<Box
										className='inputFields space fullWidth'
										sx={{ margin: '0 !important' }}
									>
										<Typography component={'label'} className='label'>
											Last Name
										</Typography>
										<InputBase
											placeholder='Last Name'
											id='LastName'
											value={profileData[0]?.lastname}
											disabled
										/>
									</Box>
								</Grid>

								<Grid item xs={12} sm={6} className='formItems'>
									<Box
										className='inputFields space fullWidth'
										sx={{ margin: '0 !important' }}
									>
										<Typography component={'label'} className='label'>
											Email
										</Typography>
										<InputBase
											placeholder='E-mail'
											id='Email'
											value={profileData[0]?.email}
											disabled
										/>
									</Box>
								</Grid>

								<Grid item xs={12} sm={6} className='formItems'>
									<Box
										className='inputFields space fullWidth'
										sx={{ margin: '0 !important' }}
									>
										<Typography component={'label'} className='label'>
											Phone Number
										</Typography>
										<InputBase
											placeholder='Phone'
											id='Phone'
											value={profileData[0]?.phone}
											disabled
										/>
									</Box>
								</Grid>

								<Grid item xs={12} className='formItems'>
									<Box
										className='inputFields space fullWidth'
										sx={{ margin: '0 !important' }}
									>
										<Typography component={'label'} className='label'>
											Message
										</Typography>
										<InputBase
											multiline
											error={true}
											helperText='Enter Message'
											placeholder='Write your message..'
											rows={6}
											onChange={(e) => {
												if (e.target.value?.length < 31) {
													setMsgError(true);
												} else {
													setMsgError(false);
												}
												setMessage(e.target.value);
											}}
											value={message}
											id='message'
										/>
										{msgError && (
											<p style={{ marginTop: '5px', color: 'red' }}>
												Message should be greater than 31 characters and less
												than 300 characters
											</p>
										)}
									</Box>
								</Grid>

								<Grid item xs={12}>
									<Box className='submitBox'>
										<button
											onClick={handleSendMessage}
											type='submit'
											className='submit-btn'
											disabled={msgError}
										>
											Send Message
										</button>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default ContactComponent;
