import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import CustomButton from '../../common/components/CustomButton';

const DeleteAccount = (props) => {
	const handleDelete = () => {};

	return (
		<>
			<List className='profile-content'>
				<ListItem>
					<Typography component='h4'>Permanent Account Deletion:</Typography>
					<Typography component='p'>
						These terms and conditions govern the process and effects of
						permanently deleting your Account.By deleting your account , you
						acknowledge and agree to the following terms.
					</Typography>
				</ListItem>

				<ListItem>
					<Typography component='h4'>Account Deletion Process:</Typography>

					<Typography component='p' className='list'>
						Once your account is deleted , all associated services , privileges
						, and benefits will be terminated and no longer accessible.
					</Typography>
					<Typography component='p' className='list'>
						To reactivate services, you must complete the full sign-up process,
						including providing all required information and agreeing to any
						updated terms.
					</Typography>
				</ListItem>

				<ListItem>
					<Typography component='h4'>Accidental Deletion:</Typography>
					<Typography component='p'>
						If your account is mistakely deleted ,please contact our customer
						support through customer support page.We will make reasonable
						efforts to address and rectify your situation
					</Typography>
				</ListItem>
			</List>

			<CustomButton
				onClick={handleDelete}
				sx={{
					marginLeft: '1.4rem',
					maxWidth: '13rem !important',
					marginBottom: '1.4rem',
				}}
				type='delete'
				title='Delete Account'
			/>
		</>
	);
};

DeleteAccount.propTypes = {};

export default DeleteAccount;
