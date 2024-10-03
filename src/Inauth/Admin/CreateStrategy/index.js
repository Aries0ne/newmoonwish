import {
	Box,
	Button,
	FormControl,
	Grid,
	InputBase,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import './style.scss';
import CustomButton from '../../../common/components/CustomButton';

const CreateStrategy = (props) => {
	const [strategyCode, setStrategyCode] = useState('');
	const [strategyDisplayName, setStrategyDisplayName] = useState('');
	const [strategyDisplayFullName, setStrategyDisplayFullName] = useState('');
	const [addTag, setAddTag] = useState();
	const [segment, setSegment] = useState();
	const [capitalRequirement, setCapitalRequirement] = useState();
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [strategyTarget, setStrategyTarget] = useState('');
	const [strategyStopLoss, setStrategyStopLoss] = useState('');
	const [description, setDescription] = useState('');

	const xs = 12;
	const md = 6;
	const lg = 4;

	// const fields = [
	// 	{
	// 		label: 'Strategy Code',
	// 		key: 'strategyCode',
	// 	},

	// 	{
	// 		label: 'Strategy Display Name',
	// 		key: 'strategyDisplayName',
	// 	},
	// 	{
	// 		label: 'Strategy Display Full Name',
	// 		key: 'strategyDisplayFullName',
	// 	},
	// 	{
	// 		type: 'select',
	// 		label: 'Add Tag',
	// 		key: 'addTag',
	// 	},
	// 	{
	// 		type: 'time',
	// 		label: 'Entry Time',
	// 		key: 'entryTime',
	// 	},
	// 	{
	// 		type: 'multi',
	// 		label: 'Description',
	// 		key: 'description',
	// 	},
	// ];

	// useEffect(() => {

	// 	dispatch(getStrategyCode());
	// }, []);

	const renderInput = () => {};

	return (
		<>
			<Typography component={'h1'} className='create-strategy-h1'>
				Disclaimer
			</Typography>

			<Typography component={'p'} className='p-strategy'>
				Algo Edge Capital nor I am a SEBI registerd investment or financial
				advisor.Don't deploy our strategies purely based on past performance
				only.
			</Typography>
			<Box>
				<Grid
					container
					spacing={2}
					alignItems={'center'}
					className='admin-grid-container'
				>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Strategy Code
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Strategy Code'
								type='text'
								value={strategyCode}
								onChange={(e) => {
									setStrategyCode(e.target.value);
								}}
							/>
						</Box>
					</Grid>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Strategy Display Name
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Strategy Display Name'
								type='text'
								value={strategyDisplayName}
								onChange={(e) => {
									setStrategyDisplayName(e.target.value);
								}}
							/>
						</Box>
					</Grid>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Strategy Display Full Name
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Strategy Display Full Name'
								type='text'
								value={strategyDisplayFullName}
								onChange={(e) => {
									setStrategyDisplayFullName(e.target.value);
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={2}
					alignItems={'center'}
					className='admin-grid-container'
				>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Add Tag
						</Typography>
						<Box className='formItems strategy-custom-input'>
							<FormControl className='dropdown-ap'>
								<Select
									value={addTag}
									onChange={(e) => setAddTag(e.target.value)}
									placeholder='Add Tag'
									className='dropdown'
								>
									<MenuItem value=''>Customer All</MenuItem>
									<MenuItem value={1}>Customer 1</MenuItem>
									<MenuItem value={2}>Customer 2</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Segment
						</Typography>
						<Box className='formItems strategy-custom-input'>
							<FormControl className='dropdown-ap'>
								<Select
									value={segment}
									onChange={(e) => setSegment(e.target.value)}
									placeholder='Segment'
									className='dropdown'
								>
									<MenuItem value=''>Customer All</MenuItem>
									<MenuItem value={1}>Customer 1</MenuItem>
									<MenuItem value={2}>Customer 2</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Grid>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Capital Requirement
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Capital Requirement'
								type='text'
								value={capitalRequirement}
								onChange={(e) => {
									setCapitalRequirement(e.target.value);
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={2}
					alignItems={'center'}
					className='admin-grid-container'
				>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Entry Time
						</Typography>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								views={['hours', 'minutes']}
								openTo='minutes'
								className='datePicker'
								sx={{
									maxWidth: '100% !important',
									width: '100% !important',
								}}
								value={dayjs(startDate)}
								onChange={(e) => {
									console.log('e :>> ', dayjs(e).format('HH:mm'));
									setStartDate(dayjs(e).format('HH:mm'));
								}}
								ampm={false}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Exit Time
						</Typography>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								views={['hours', 'minutes']}
								openTo='minutes'
								className='datePicker'
								sx={{
									maxWidth: '100% !important',
									width: '100% !important',
								}}
								value={dayjs(endDate)}
								onChange={(e) => {
									console.log('e :>> ', dayjs(e).format('HH:mm'));
									setEndDate(dayjs(e).format('HH:mm'));
								}}
								ampm={false}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Strategy Target
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Strategy Target'
								type='text'
								value={strategyTarget}
								onChange={(e) => {
									setStrategyTarget(e.target.value);
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={2}
					alignItems={'center'}
					className='admin-grid-container'
				>
					<Grid item xs={xs} md={md} lg={lg}>
						<Typography component={'label'} className='admin-label label'>
							Strategy Stop loss
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Strategy Stop loss'
								type='text'
								value={strategyStopLoss}
								onChange={(e) => {
									setStrategyStopLoss(e.target.value);
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={2}
					alignItems={'center'}
					className='admin-grid-container'
				>
					<Grid item lg={12}>
						<Typography component={'label'} className='admin-label label'>
							Description
						</Typography>
						<Box className='inputFields space strategy-custom-input'>
							<InputBase
								placeholder='Description'
								type='text'
								multiline={true}
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Box sx={{ display: { xs: 'flex' }, marginTop: 2 }}>
					<CustomButton type='delete' title='Discard' onClick={() => {}} />

					<CustomButton
						type='confirm'
						onClick={() => {}}
						sx={{ marginLeft: '1rem' }}
					/>
				</Box>
			</Box>
		</>
	);
};

CreateStrategy.propTypes = {};

export default CreateStrategy;
