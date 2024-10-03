import { Box, Typography, Button, Tooltip } from '@mui/material';
import React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import '../Inauth/Admin/Dashboard/Dashboardview/Dashboardview.scss'
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

const AdminDashComponent = (props) => {

	const android = <Typography sx={{ fontSize: '1.4rem' }}>Android App</Typography>
	const IOS = <Typography sx={{ fontSize: '1.4rem' }}>IOS App</Typography>
	const { icon, overallview, todayview, handelSubmit } = props


	return (
		<>
			<Box className='overAll-view'>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Box className="refresh-button" sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography component={'h2'} className='adminD-title'>Overall View</Typography>
						<Box>
							<Tooltip arrow>
								<Button className='download-btn solidButton' sx={{ margin: '0 0 0 1rem !important' }} onClick={() => handelSubmit()} >
									<RefreshIcon />
								</Button>
							</Tooltip>
						</Box>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: { xs: 0, md: 4 } }}>

						<Box className='selectionDiv' sx={{ display: { xs: 'block', lg: 'flex' }, alignItems: 'center', marginLeft: 1 }}>
							<Typography component={'label'} className='label'>Month: </Typography>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker className='datePicker' format="MMMM" views={['month']} />
							</LocalizationProvider>
						</Box>

						<Box className='selectionDiv' sx={{ display: { xs: 'block', lg: 'flex' }, alignItems: 'center', marginLeft: 1 }}>
							<Typography component={'label'} className='label'>Year: </Typography>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker className='datePicker' views={['year']} />
							</LocalizationProvider>
						</Box>
					</Box>
				</Box>

				<Box className='overAll-flex'>
					{todayview.map((overalls, index) => (
						<Box className='overAll-item' key={index}>
							<Box className='overAll-left'>
								<Box className='overAll-icon'>{icon}</Box>
								<Typography component={'p'}>{overalls.category}</Typography>
							</Box>
							<Box className='overAll-count'>{overalls.customer}</Box>
						</Box>
					))}
				</Box>
			</Box>

			<Box className='overAll-view' sx={{ marginTop: 5 }}>
				<Typography component={'h2'} className='adminD-title'>Today View</Typography>

				<Box className='overAll-flex'>
					{overallview.map((overalls, index) => (
						<Box className='overAll-item' key={index}>
							<Box className='overAll-left'>
								<Box className='overAll-icon'>{icon}</Box>
								<Typography component={'p'}>{overalls.category}</Typography>
							</Box>
							<Box className='overAll-count'>{overalls.customer}</Box>
						</Box>
					))}
				</Box>
			</Box>

			<Box className='formItems' sx={{ marginTop: 5 }}>
				<Button className='formSolid-btn' sx={{ direction: 'block' }}>Copy Your Refer Link</Button>
				<Tooltip title={android} arrow placement='top'>
					<Button className='download-btn solidButton android' sx={{ marginLeft: 1, backgroundColor: '#008000 !important' }}>
						<AdbIcon />
					</Button>
				</Tooltip>
				<Tooltip title={IOS} arrow placement='top'>
					<Button className='download-btn solidButton ios' sx={{ marginLeft: 1 }}>
						<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
							<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill='currentColor' />
						</svg>
					</Button>
				</Tooltip>
			</Box>
		</>
	)
}

export default AdminDashComponent