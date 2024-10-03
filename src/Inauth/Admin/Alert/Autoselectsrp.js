import React, { useState } from 'react';
import {
	Autocomplete,
	TextField,
	Typography,
	Box,
	CircularProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function Autoselectsrp(props) {
	console.log('logs 666 props selected Value', props.selectedValue);

	return (
		<>
			<Box className='formBox' sx={{ border: 'none !important' }}>
				<Box className='formItems'>
					<Box className='selectionDiv brokerDrp'>
						<Box
							className='dropdown-ap'
							sx={{
								'& > div.MuiAutocomplete-root > div.MuiFormControl-root > div.MuiInputBase-root':
									{ padding: '0 !important', border: 'none !important' },
							}}
						>
							<Autocomplete
								freeSolo
								className='dropdown'
								inputValue={props.selectedValue}
								value={props.selectedValue}
								onChange={(e, newValue) => {
									console.log('logs 666 new selected Value onChange', newValue);
									props.handleSelectAlert(newValue);
								}}
								onInputChange={(e, value, reason) => {
									console.log('logs 666 on Input Change ', value);
									if (
										value !== null &&
										value !== undefined &&
										value !== 'undefined'
									) {
										props.handleAlertSearch(value);
									}
								}}
								options={props.exchanges}
								getOptionLabel={(option) => option?.symbol}
								renderInput={(params, option) => {
									return (
										<>
											<Box className='MultieValue'>
												<TextField
													placeholder='Scrip'
													value={props.selectedValue}
													{...params}
													sx={{
														'&.MuiFormControl-root > .MuiInputBase-root > input.MuiInputBase-input':
															{
																border: 'none !important',
															},
													}}
												/>
												<Box className='autoComplete-box'>
													{props.selectedAlert && <TrendingUpIcon />}
													{props.selectedAlert &&
														parseFloat(props.selectedAlert?.price).toFixed(2)}
												</Box>
											</Box>
										</>
									);
								}}
								renderOption={(props, option) => {
									return (
										<Box {...props} className='searchSelect'>
											<Box className='exchangeName'>
												<Typography component='h4'>{option.symbol}</Typography>
												<Typography component='p'>{option.token}</Typography>
											</Box>
											<Typography component='h5' className='rate up'>
												<svg
													focusable='false'
													aria-hidden='true'
													viewBox='0 0 24 24'
													data-testid='TrendingUpIcon'
												>
													<path
														d='m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z'
														fill='#0071F3'
													></path>
												</svg>
												{parseFloat(option.price).toFixed(2)}
											</Typography>
										</Box>
									);
								}}
								sx={{
									border: 'none !important ',
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}
