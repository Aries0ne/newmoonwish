import { ModeEditOutline } from '@mui/icons-material';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import UploadIcon from '@mui/icons-material/Upload';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	FormControl,
	FormControlLabel,
	Grid,
	InputBase,
	Menu,
	MenuItem,
	Radio,
	RadioGroup,
	Tab,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

import { FileCopy } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import MessageCell from '../../../Components/messageComponent';
import close from '../../../images/close.png';
import {
	deleteAlertData,
	deleteBulkAlertData,
	getAlertData,
	getAlertFutureData,
	getAlertOptionData,
	getAlertOptionStrikeData,
	getAlertPrice,
	sendAlertData,
	updateAlertData,
	uploadBulkAlertData,
} from '../../../redux/actions/alertActions';
import { generatePopup } from '../../../utils/popup';
import './Alert.scss';

import '../../Admin/Alert/Alert';
import Autoselect from '../../Admin/Alert/Autoselect';
import Autoselectsrp from '../../Admin/Alert/Autoselectsrp';
import Dropdown from '../../Dropdown/Dropdown';
import Table from '../../Table/Table';
import TableSearch from '../../Tablesearch/Tablesearch';
import { useSocket } from '../../../hooks/useNewSocket';

export default function AlertComp() {
	const dispatch = useDispatch();

	const [exchange, setExchange] = useState('NSE');
	const [script, setScript] = useState('');
	const [condition, setCondition] = useState('Above');
	const [value, setValue] = useState(0);
	const [message, setMessage] = useState('');
	const [alertList, setAlertList] = useState([]);
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);
	const [editElement, setEditElement] = useState();
	const [statusSearch, setStatusSearch] = useState('All');
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedValue, setSelectedValue] = useState('');
	const [selectedAlert, setSelectedAlert] = useState();
	const [options, setOptions] = useState('future');
	const [futureExpiryData, setFutureExpiryData] = useState('');
	const [cpExpiry, setCpExpiry] = useState('');
	const [cpStrike, setCpStrike] = useState('');
	const [popup, setPopup] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [compVal, setCompVal] = useState(0);
	const [editElementPrice, setEditElementPrice] = useState(0);
	const [error, setError] = useState('');
	const [editOpen, setEditOpen] = useState(false);
	const [hover, setHover] = useState(false);

	const alertData = useSelector((State) => State.Alert.adminAlertData);
	const alertSymbols = useSelector((State) => State.Alert.alertSymbols);
	const futureData = useSelector((State) => State.Alert.futureData);
	const optionExpiryData = useSelector((State) => State.Alert.optionExpiryData);
	const optionStrikeData = useSelector((State) => State.Alert.optionStrikeData);
	const isLoading = useSelector((state) => state.Alert.loading);
	const title = 'Status';
	const statusValues = ['All', 'Active', 'Triggered'];
	const alertSocket = useSocket('alert');

	const [isSendMessage,setIsSendMessage] = useState(false);

	const col = [
		<Checkbox
			onChange={(e) => handleRowSelection(undefined, true, e)}
			checked={selectedRows?.length === alertData?.length}
		/>,
		'STATUS',
		'TIME',
		'SCRIP',
		'VALUE',
		'CONDITION ',
		'MESSAGE',
		'ACTION',
	];

	useEffect(()=>{
		if(alertSocket.isConnected && !isSendMessage)
		{
			sendWatchListMsg();
			setIsSendMessage(true);
		}
	},[alertSocket,isSendMessage])

	useEffect(() => {
		getAlertList();
	}, []);

	useEffect(() => {
		setSelectedAlert('');
	}, [exchange]);
	

	const sendWatchListMsg = (value = search, exchangeName = exchange) => {
		if (alertSocket?.isConnected) {
			alertSocket.sendMessage({
				exchange: exchangeName,
				symbol: value?.length == 0 ? 'NA' : value.toUpperCase(),
			});
		}
	};

	const handlePopup = (value) => {
		setPopup(value);
	};

	const handleEditOpen = (ele, index) => {
		if (alertData) {
			const element = alertData[index];
			dispatch(getAlertPrice({ token: element.token })).then((res) => {
				if (res.status) {
					setEditElementPrice(res.price);
					setCompVal(parseFloat(res.price).toFixed(2));
					setValue(parseFloat(res.price).toFixed(2));
					setSelectedAlert(element);
				}
			});
			setEditElement(element);
			setCondition(element.type);
			setMessage(element.message);
			setEditOpen(true);
		}
	};
	const handleEditClose = () => {
		setEditOpen(false);
		handleClear();
	};

	const handleRowSelection = (id, allRow = false, e = null) => {
		if (allRow) {
			if (e.target.checked) {
				let idArr = alertData?.map((val) => val.id);
				setSelectedRows(idArr);
			} else {
				setSelectedRows([]);
			}
		} else {
			if (selectedRows?.includes(id)) {
				setSelectedRows(selectedRows?.filter((rowId) => rowId !== id));
			} else {
				setSelectedRows([...selectedRows, id]);
			}
		}
	};

	const commonArrayFun = (alertData = alertData) => {
		let alerts = [];
		for (let i = 0; i < alertData?.length; i++) {
			let element = alertData[i];

			const date = moment(element.datetime).format('D MMMM YYYY');
			const dateTime = moment(element.datetime).format('HH:mm:ss A');

			alerts.push({
				id: element.id,
				check: (
					<Checkbox
						checked={selectedRows?.includes(element.id)}
						onChange={() => handleRowSelection(element.id)}
					/>
				),
				status: element.status,
				time: (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<span>{date}</span>
						<span>{dateTime}</span>
					</div>
				),
				symbol: element.symbol,
				value: parseFloat(element.value).toFixed(2),
				type: element.type,
				message: <MessageCell message={element.message} />,
				actions: [
					{
						type: 'edit',
						icon: <ModeEditOutline />,
						onClick: handleEditOpen,
					},
					{
						type: 'copy',
						icon: <ContentCopyIcon />,
						onClick: handleClickOpen,
					},
					{ type: 'delete', icon: <DeleteIcon />, onClick: handleDelete },
				],
				// action: (
				// 	<div style={{ display: 'flex' }}>
				// 		<Button
				// 			className='squerOff'
				// 			onClick={() => handleDelete(element.id)}
				// 		>
				// 			<DeleteForeverIcon />
				// 		</Button>
				// 		{element.status != 'Triggered' && (
				// 			<Button
				// 				className='edit'
				// 				onClick={() => handleEditOpen(element)}
				// 				style={{ marginLeft: 5, marginRight: 5 }}
				// 			>
				// 				<ModeEditIcon />
				// 			</Button>
				// 		)}
				// 		<Button className='edit' onClick={() => }>
				// 			<FileCopy />
				// 		</Button>
				// 	</div>
				// ),
			});
		}
		return alerts;
	};

	useEffect(() => {
		let alerts = [];
		if (alertData && alertData.length > 0) {
			alerts = commonArrayFun(alertData);
		}

		setAlertList(alerts);
	}, [alertData, selectedRows]);

	const getAlertList = () => {
		dispatch(getAlertData());
	};

	const handleExchange = (event, newValue) => {
		setExchange(newValue);
		sendWatchListMsg('', newValue);
		setSelectedValue('');
		setValue(0);
		setCpStrike('');
		setCpExpiry('');
		setFutureExpiryData('');
		setOptions('future');
		setError('');
	};
	const handleScript = (event) => {
		setScript(event.target.value);
	};
	const handleValue = (event) => {
		setValue(parseFloat(event.target.value));
	};
	const handleMessage = (event) => {
		setMessage(event.target.value);
	};
	const handleCondition = (event) => {
		setCondition(event.target.value);
		setValue(parseFloat(compVal).toFixed(2));
	};
	const handleIncrement = () => {
		setValue((oldValue) => {
			if (condition == 'Below' && oldValue >= compVal) {
				return parseFloat(oldValue).toFixed(2);
			}
			return parseFloat(parseFloat(oldValue) + 1).toFixed(2);
		});
	};
	const handleDecrement = () => {
		setValue((oldValue) => {
			if (condition == 'Above' && oldValue <= compVal) {
				return parseFloat(oldValue).toFixed(2);
			}
			return parseFloat(parseFloat(oldValue) - 1).toFixed(2);
		});
	};
	const handleDropdownChange = (event) => {
		setStatusSearch(event.target.value);
		handleFilter(undefined, event.target.value);
	};

	const handleAlertSearch = (value) => {
		setSelectedValue(value);
		sendWatchListMsg(value, exchange);
	};
	const handleSelectAlert = (value) => {
		setSelectedAlert(value);
		setOptions('future');
		if (exchange == 'NFO' || exchange == 'MCX' || exchange == 'CDS') {
			if (value != null) {
				dispatch(
					getAlertFutureData({ exchange: exchange, symbol: value?.symbol })
				).then((res) => {
					if (res?.length > 0) {
						setFutureExpiryData(res[0]?.token);
						setSelectedAlert({ ...value, token: res[0]?.token });
						setValue(parseFloat(res[0]?.price).toFixed(2));
						setCompVal(parseFloat(res[0]?.price).toFixed(2));
					}
				});
			} else {
				setValue(0);
			}
		} else {
			if (value != null) {
				setValue(parseFloat(value.price).toFixed(2));
				setCompVal(parseFloat(value.price).toFixed(2));
			} else {
				setValue(0);
			}
		}
	};

	const handleClear = () => {
		setSelectedAlert('');
		setValue(0);
		// setExchange("NSE");
		setMessage('');
		setScript('');
		setCondition('Above');
		setCompVal(0);
		setFutureExpiryData('');
		setCpExpiry('');
		setCpStrike('');
		setSelectedValue('');
		setError('');
	};

	const createAlert = () => {
		if (selectedAlert?.symbol?.length > 0 && value !== 0) {
			if (condition == 'Above' && parseFloat(value) < parseFloat(compVal)) {
				setError(`Value should greater than or equal to ${compVal}`);
				return;
			} else if (
				condition == 'Below' &&
				parseFloat(value) > parseFloat(compVal)
			) {
				setError(`Value should less than or equal to ${compVal}`);
				return;
			} else if (message.length > 32) {
				setError('message should be less than 32 letters');
				return;
			}

			dispatch(
				sendAlertData({
					symbol: selectedAlert?.symbol,
					exchange: exchange,
					type: condition,
					value: value,
					message: message,
					token: selectedAlert?.token,
				})
			);
			handleClear();
			handleClose();
		} else {
			return generatePopup('error', 'Please enter proper details.');
		}
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
		handleFilter(event.target.value);
	};

	const handleFilter = (searchVal = search, statusVal = statusSearch) => {
		setPage(0);
		let filterData = alertData?.filter((val) => {
			if (searchVal.length == 0 && statusVal == 'All') {
				return val;
			} else if (
				statusVal == 'All' &&
				val.symbol.toLowerCase().includes(searchVal.toLowerCase())
			) {
				return val;
			} else if (searchVal.length == 0 && val.status == statusVal) {
				return val;
			} else if (
				val.symbol.toLowerCase().includes(searchVal.toLowerCase()) &&
				val.status == statusVal
			) {
				return val;
			}
		});

		let alerts = commonArrayFun(filterData);
		setAlertList(alerts);
	};

	const handleUpdateData = () => {
		dispatch(
			updateAlertData({
				id: editElement.id,
				value: value,
				message: message,
				condition: condition,
			})
		);
		setEditOpen(false);
		handleClear();
	};

	const handleDelete = (ele) => {
		if (ele?.id) {
			dispatch(deleteAlertData({ id: ele.id }));
		}
	};

	const handleBulkDelete = () => {
		dispatch(deleteBulkAlertData({ id: selectedRows }));
		setSelectedRows([]);
		setPopup(false);
	};

	const handleClickOpen = (element) => {
		setExchange(element.exchange);
		dispatch(getAlertPrice({ token: element.token })).then((res) => {
			if (res.status) {
				setEditElementPrice(res.price);
				setCompVal(parseFloat(res.price).toFixed(2));
				setValue(parseFloat(res.price).toFixed(2));
				setSelectedAlert(element);
			}
		});
		setOpen(true);
		setEditElement(element);
	};

	const handleClose = () => {
		setOpen(false);
		handleClear();
	};

	const handleBulkUpload = (event) => {
		const formData = new FormData();
		const fileData = event.target.files[0];
		formData.append('file', fileData);
		dispatch(uploadBulkAlertData(formData));
	};

	const handleChangeOptions = (e, newValue = 'string') => {
		setOptions(newValue);

		if (exchange == 'NFO' || exchange == 'MCX' || exchange == 'CDS') {
			if (newValue == 'future') {
				dispatch(
					getAlertFutureData({
						exchange: exchange,
						symbol: selectedAlert?.symbol,
					})
				).then((res) => {
					if (res?.length > 0) {
						setFutureExpiryData(res[0]?.token);
						setSelectedAlert({ ...selectedAlert, token: res[0]?.token });
						setValue(parseFloat(res[0]?.price).toFixed(2));
						setCompVal(parseFloat(res[0]?.price).toFixed(2));
					}
				});
			} else if (newValue == 'call') {
				dispatch(
					getAlertOptionData(
						{
							exchange: exchange,
							symbol: selectedAlert?.symbol,
						},
						'optionce'
					)
				).then((res) => {
					if (res.length > 0) {
						setCpExpiry(res[0]);
						getOptionStrikeDataFun(
							{
								exchange: exchange,
								symbol: selectedAlert?.symbol,
								expiry: res[0],
							},
							'optioncestrike'
						);
					}
				});
			} else if (newValue == 'put') {
				dispatch(
					getAlertOptionData(
						{
							exchange: exchange,
							symbol: selectedAlert?.symbol,
						},
						'optionpe'
					)
				).then((res) => {
					if (res.length > 0) {
						setCpExpiry(res[0]);
						getOptionStrikeDataFun(
							{
								exchange: exchange,
								symbol: selectedAlert?.symbol,
								expiry: res[0],
							},
							'optionpestrike'
						);
					}
				});
			}
		}
	};

	const getOptionStrikeDataFun = (payload, optionType) => {
		dispatch(getAlertOptionStrikeData(payload, optionType)).then((res) => {
			setCpStrike(res[0]?.token);
			setSelectedAlert({ ...selectedAlert, token: res[0]?.token });
			setValue(parseFloat(res[0]?.price).toFixed(2));
			setCompVal(parseFloat(res[0]?.price).toFixed(2));
		});
	};

	const handleExpiryChange = (newValue) => {
		let selectedData = futureData.filter((d) => d.token == newValue);
		setFutureExpiryData(newValue);
		setSelectedAlert({ ...selectedAlert, token: newValue });
		setValue(parseFloat(selectedData[0]?.price).toFixed(2));
		setCompVal(parseFloat(selectedData[0]?.price).toFixed(2));
	};

	const handleCPExpiryChange = (event) => {
		setCpExpiry(event.target.value);
		getOptionStrikeDataFun(
			{
				exchange: exchange,
				symbol: selectedAlert?.symbol,
				expiry: event.target.value,
			},
			options == 'call' ? 'optioncestrike' : 'optionpestrike'
		);
	};

	const handleCPStrikeChange = (value) => {
		let selectedData = optionStrikeData.filter((d) => d.token == value);

		setCpStrike(value);
		setSelectedAlert({ ...selectedAlert, token: value });
		setValue(parseFloat(selectedData[0]?.price).toFixed(2));
		setCompVal(parseFloat(selectedData[0]?.price).toFixed(2));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [newValue, setNewValue] = useState(editElement?.value);
	const [newMessage, setNewMessage] = useState(editElement?.message);

	useEffect(() => {
		setNewValue(editElement?.value);
		setNewMessage(editElement?.message);
	}, [editElement]);

	const minus = { left: '8px' };
	const plus = { right: '8px' };

	const [Dropdown3, setDropdown3] = React.useState(false);
	// const open3 = Boolean(Dropdown3);
	const handleClicklanguage = (event) => {
		setDropdown3(event.currentTarget);
	};
	const handleCloselanguage = () => {
		setDropdown3(false);
	};

	const [openHelp, setopenHelp] = useState(false);
	const handleOpenHelp = () => {
		setopenHelp(true);
	};

	const handleCloseHelp = () => {
		setopenHelp(false);
	};

	const csvData = [
		{
			Exchange: 'NFO',
			ScriptCode: '26000',
			Condition: 'Above',
			Rate: 43000,
			Message: 'Alert Alert',
		},
	];

	const ttCSVData = [
		{
			Exchange: 'NF',
			ScripCode: '57931',
			ScripName: 'ADANIENT',
			InitiateTime: '30-Nov-2023',
			Alerttime: '',
			Rate: '2350.25',
			Condition: '>=',
			Message: 'Buy',
			IsStrikebln: 'FALSE',
		},
		{
			Exchange: 'NF',
			ScripCode: '57998',
			ScripName: 'CHOLAFIN',
			InitiateTime: '30-Nov-2023',
			AlertTime: '',
			Rate: '1086.15',
			Condition: '<=',
			Message: 'SELL TGT-1',
			IsStrikebln: 'FALSE',
		},
	];

	const commonAlert = (
		<>
			<Box className='formItems alertStyle'>
				<Typography component={'label'} className='label'>
					Alert when LTP is
				</Typography>
				<FormControl className='inputFields ' sx={{ display: 'block' }}>
					<RadioGroup row value={condition} onChange={handleCondition}>
						<FormControlLabel
							value='Above'
							sx={{ marginRight: '2.5rem' }}
							control={<Radio />}
							label='Above'
						/>
						<FormControlLabel
							value='Below'
							sx={{ marginRight: '2.5rem' }}
							control={<Radio />}
							label='Below'
						/>
					</RadioGroup>
				</FormControl>
			</Box>

			<Box className='formItems'>
				{/* <Typography component={"label"} className="label">
          Value
        </Typography> */}
				<Box sx={{ position: 'relative', marginTop: 1, marginBottom: 1 }}>
					<Box className='selectionDiv bn searchFlex'>
						<Box className='inputFields fullWidth'>
							<InputBase
								placeholder='Value'
								value={value}
								onChange={handleValue}
								type='number'
							/>
						</Box>
					</Box>
					<Button
						className='solidButton counterBtn'
						sx={minus}
						onClick={handleDecrement}
					>
						-
					</Button>
					<Button
						className='solidButton counterBtn'
						sx={plus}
						onClick={handleIncrement}
					>
						+
					</Button>
				</Box>
				{error.length > 0 && (
					<Typography
						component={'label'}
						className='label'
						style={{ color: 'red' }}
					>
						{error}
					</Typography>
				)}
			</Box>

			<Box className='formItems inputFields fullWidth space'>
				{/* <Typography component={"label"} className="label">
          Message
        </Typography> */}
				<TextField
					value={message}
					multiline
					alertList={4}
					placeholder='Message'
					onChange={handleMessage}
				/>
			</Box>

			<Box
				className='formItems'
				sx={{
					display: { xs: 'block', md: 'flex' },
					justifyContent: { md: 'space-between' },
					marginTop: 2,
				}}
			>
				<Button
					className='formSolid-btn'
					sx={{ marginBottom: 2 }}
					onClick={createAlert}
				>
					CREATE ALERT
				</Button>
				<Button
					className='customize-btn'
					sx={{ marginBottom: 2 }}
					onClick={handleClear}
				>
					CLEAR VALUES{' '}
				</Button>
			</Box>
		</>
	);

	return (
		<>
			<>
				<Grid container spacing={2} justifyContent='center'>
					<Grid item xs={12} lg={5} xl={4}>
						<Box
							className='border-ap'
							sx={{ padding: { xs: '1rem ', md: '2rem' } }}
						>
							<Box className='tabs'>
								<TabContext value={exchange}>
									<Typography component={'label'} className='label'>
										Exchange
									</Typography>
									<TabList className='main-tab' onChange={handleExchange}>
										<Tab label='NSE' value='NSE' />
										{/* <Tab label="BSE" value="BSE" /> */}
										<Tab label='NFO' value='NFO' />
										<Tab label='CDS' value='CDS' />
										<Tab label='MCX' value='MCX' />
									</TabList>

									{/* NSE Tab */}
									<TabPanel value={'NSE'} sx={{ padding: 0 }}>
										<Box className='selectionDiv bn searchFlex'>
											<Box
												className='inputFields space fullWidth'
												sx={{ '& > .MuiInputBase-root': { width: '100%' } }}
											>
												<Autoselectsrp
													// setLtpValue={setLtpValue}
													exchanges={alertSymbols}
													selectedValue={selectedValue}
													handleAlertSearch={handleAlertSearch}
													handleSelectAlert={handleSelectAlert}
													selectedAlert={selectedAlert}
												/>
											</Box>
										</Box>

										{commonAlert}
									</TabPanel>

									{/* BSE Tab */}
									<TabPanel value={'CDS'} sx={{ padding: 0 }}>
										<Box className='selectionDiv bn searchFlex'>
											<Box
												className='inputFields space fullWidth'
												sx={{ '& > .MuiInputBase-root': { width: '100%' } }}
											>
												<Autoselectsrp
													exchanges={alertSymbols}
													selectedValue={selectedValue}
													handleAlertSearch={handleAlertSearch}
													handleSelectAlert={handleSelectAlert}
													selectedAlert={selectedAlert}
												/>
											</Box>
										</Box>

										<Box className='tabs' sx={{ marginTop: 2 }}>
											<Box
												className='tabBox'
												sx={{ border: 'none !important' }}
											>
												<Box className='sub-tabBox'>
													<TabContext value={options}>
														<TabList
															className='main-tab'
															onChange={handleChangeOptions}
														>
															<Tab
																sx={{ width: '33.33%' }}
																label='FUTURE'
																value='future'
															/>
															<Tab
																sx={{ width: '33.33%' }}
																label='CALL'
																value='call'
															/>
															<Tab
																sx={{ width: '33.33%' }}
																label='PUT'
																value='put'
															/>
														</TabList>
														<TabPanel value='future' sx={{ padding: 0 }}>
															<Box className='selectiondiv-box fullWidth'>
																<Autoselect
																	val={futureData}
																	handleExpiryChange={handleExpiryChange}
																	futureExpiryData={futureExpiryData}
																/>
															</Box>
														</TabPanel>
														<TabPanel value='call' sx={{ padding: 0 }}>
															<Box
																sx={{ display: 'flex', alignItems: 'center' }}
															>
																<Box sx={{ width: '50%' }}>
																	<Box class='selectiondiv-box fullWidth'>
																		<Dropdown
																			val={optionExpiryData}
																			value={cpExpiry}
																			handleChange={handleCPExpiryChange}
																		/>
																	</Box>
																</Box>
																<Box sx={{ width: '50%' }}>
																	<Autoselect
																		val={optionStrikeData}
																		futureExpiryData={cpStrike}
																		handleExpiryChange={handleCPStrikeChange}
																	/>
																</Box>
															</Box>
														</TabPanel>
														<TabPanel value='put' sx={{ padding: 0 }}>
															<Box
																sx={{ display: 'flex', alignItems: 'center' }}
															>
																<Box sx={{ width: '50%' }}>
																	<Box class='selectiondiv-box fullWidth'>
																		<Dropdown
																			val={optionExpiryData}
																			value={cpExpiry}
																			handleChange={handleCPExpiryChange}
																		/>
																	</Box>
																</Box>
																<Box sx={{ width: '50%' }}>
																	<Autoselect
																		val={optionStrikeData}
																		futureExpiryData={cpStrike}
																		handleExpiryChange={handleCPStrikeChange}
																	/>
																</Box>
															</Box>
														</TabPanel>
													</TabContext>
												</Box>
											</Box>
											{commonAlert}
										</Box>
									</TabPanel>

									{/* NFO Tab */}
									<TabPanel value={'NFO'} sx={{ padding: 0 }}>
										<Box className='selectionDiv bn searchFlex'>
											<Box
												className='inputFields space fullWidth'
												sx={{ '& > .MuiInputBase-root': { width: '100%' } }}
											>
												<Autoselectsrp
													exchanges={alertSymbols}
													selectedValue={selectedValue}
													handleAlertSearch={handleAlertSearch}
													handleSelectAlert={handleSelectAlert}
													selectedAlert={selectedAlert}
												/>
											</Box>
										</Box>
										<Box className='tabs' sx={{ marginTop: 2 }}>
											<Box
												className='tabBox'
												sx={{ border: 'none !important' }}
											>
												<Box className='sub-tabBox'>
													<TabContext value={options}>
														<TabList
															className='main-tab'
															onChange={handleChangeOptions}
														>
															<Tab
																sx={{ width: '33.33%' }}
																label='FUTURE'
																value='future'
															/>
															<Tab
																sx={{ width: '33.33%' }}
																label='CALL'
																value='call'
															/>
															<Tab
																sx={{ width: '33.33%' }}
																label='PUT'
																value='put'
															/>
														</TabList>
														<TabPanel value='future' sx={{ padding: 0 }}>
															<Box className='selectiondiv-box fullWidth'>
																<Autoselect
																	val={futureData}
																	handleExpiryChange={handleExpiryChange}
																	futureExpiryData={futureExpiryData}
																/>
															</Box>
														</TabPanel>
														<TabPanel value='call' sx={{ padding: 0 }}>
															<Box
																sx={{ display: 'flex', alignItems: 'center' }}
															>
																<Box sx={{ width: '50%' }}>
																	<Typography
																		component={'label'}
																		className='label'
																	>
																		Expiry
																	</Typography>
																	<Box class='selectiondiv-box fullWidth'>
																		<Dropdown
																			val={optionExpiryData}
																			value={cpExpiry}
																			handleChange={handleCPExpiryChange}
																		/>
																	</Box>
																</Box>
																<Box sx={{ width: '50%' }}>
																	<Typography
																		component={'label'}
																		className='label'
																	>
																		Strike
																	</Typography>
																	<Autoselect
																		val={optionStrikeData}
																		futureExpiryData={cpStrike}
																		handleExpiryChange={handleCPStrikeChange}
																	/>
																</Box>
															</Box>
														</TabPanel>
														<TabPanel value='put' sx={{ padding: 0 }}>
															<Box
																sx={{ display: 'flex', alignItems: 'center' }}
															>
																<Box sx={{ width: '50%' }}>
																	<Typography
																		component={'label'}
																		className='label'
																	>
																		Expiry
																	</Typography>
																	<Box class='selectiondiv-box fullWidth'>
																		<Dropdown
																			val={optionExpiryData}
																			value={cpExpiry}
																			handleChange={handleCPExpiryChange}
																		/>
																	</Box>
																</Box>
																<Box sx={{ width: '50%' }}>
																	<Typography
																		component={'label'}
																		className='label'
																	>
																		Strike
																	</Typography>
																	<Autoselect
																		val={optionStrikeData}
																		futureExpiryData={cpStrike}
																		handleExpiryChange={handleCPStrikeChange}
																	/>
																</Box>
															</Box>
														</TabPanel>
													</TabContext>
												</Box>
											</Box>
											{commonAlert}
										</Box>
									</TabPanel>

									{/* MCX Tab */}
									<TabPanel value={'MCX'} sx={{ padding: 0 }}>
										<Box className='selectionDiv bn searchFlex'>
											<Box
												className='inputFields space fullWidth'
												sx={{ '& > .MuiInputBase-root': { width: '100%' } }}
											>
												<Autoselectsrp
													exchanges={alertSymbols}
													selectedValue={selectedValue}
													handleAlertSearch={handleAlertSearch}
													handleSelectAlert={handleSelectAlert}
													selectedAlert={selectedAlert}
												/>
											</Box>
										</Box>
										<Box className='tabs' sx={{ marginTop: 2 }}>
											{/* {typeof selectedAlert == "object" &&
                      selectedAlert != null &&
                      Object.keys(selectedAlert).length > 0 && ( */}
											<Box
												className='tabBox'
												sx={{ border: 'none !important' }}
											>
												<Box className='sub-tabBox'>
													<TabContext value={options}>
														<TabList
															className='main-tab'
															onChange={handleChangeOptions}
														>
															<Tab
																sx={{ width: '33.33%' }}
																label='FUTURE'
																value='future'
															/>
															<Tab
																sx={{ width: '33.33%' }}
																label='CALL'
																value='call'
															/>
															<Tab
																sx={{ width: '33.33%' }}
																label='PUT'
																value='put'
															/>
														</TabList>
														<TabPanel value='future' sx={{ padding: 0 }}>
															<Box className='selectiondiv-box fullWidth'>
																<Autoselect
																	val={futureData}
																	handleExpiryChange={handleExpiryChange}
																	futureExpiryData={futureExpiryData}
																/>
															</Box>
														</TabPanel>
														<TabPanel value='call' sx={{ padding: 0 }}>
															<Box
																sx={{ display: 'flex', alignItems: 'center' }}
															>
																<Box sx={{ width: '50%' }}>
																	<Box class='selectiondiv-box fullWidth'>
																		<Dropdown
																			val={optionExpiryData}
																			value={cpExpiry}
																			handleChange={handleCPExpiryChange}
																		/>
																	</Box>
																</Box>
																<Box sx={{ width: '50%' }}>
																	<Autoselect
																		val={optionStrikeData}
																		futureExpiryData={cpStrike}
																		handleExpiryChange={handleCPStrikeChange}
																	/>
																</Box>
															</Box>
														</TabPanel>
														<TabPanel value='put' sx={{ padding: 0 }}>
															<Box
																sx={{ display: 'flex', alignItems: 'center' }}
															>
																<Box sx={{ width: '50%' }}>
																	<Box class='selectiondiv-box fullWidth'>
																		<Dropdown
																			val={optionExpiryData}
																			value={cpExpiry}
																			handleChange={handleCPExpiryChange}
																		/>
																	</Box>
																</Box>
																<Box sx={{ width: '50%' }}>
																	<Autoselect
																		val={optionStrikeData}
																		futureExpiryData={cpStrike}
																		handleExpiryChange={handleCPStrikeChange}
																	/>
																</Box>
															</Box>
														</TabPanel>
													</TabContext>
												</Box>
											</Box>
											{/* )} */}

											{commonAlert}
										</Box>
									</TabPanel>
								</TabContext>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} lg={7} xl={7}>
						<Box className='border-ap'>
							<Grid
								container
								spacing={2}
								sx={{ padding: { xs: '1rem ', md: '2rem' }, marginBottom: 1 }}
							>
								<Grid item xs={12} md={6}>
									<Box className='alertBox'>
										<Box className='alertBox-item'>
											<svg
												className='alert'
												width='15'
												height='15'
												viewBox='0 0 15 15'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<rect
													x='0.25'
													y='0.250244'
													width='13.875'
													height='3.20192'
													rx='0.75'
													fill='currentColor'
												/>
												<rect
													x='0.25'
													y='14.1252'
													width='9.60577'
													height='3.73558'
													rx='0.75'
													transform='rotate(-90 0.25 14.1252)'
													fill='currentColor'
												/>
												<rect
													x='5.58691'
													y='14.1252'
													width='9.60577'
													height='3.73558'
													rx='0.75'
													transform='rotate(-90 5.58691 14.1252)'
													fill='currentColor'
												/>
												<rect
													x='10.3896'
													y='14.1252'
													width='9.60577'
													height='3.73558'
													rx='0.75'
													transform='rotate(-90 10.3896 14.1252)'
													fill='currentColor'
												/>
											</svg>
											<Box className='bulkAlert_drp'>
												<Button
													className='headerButtons'
													onClick={handleClicklanguage}
												>
													Bulk Alert
												</Button>
												<Menu
													anchorEl={Dropdown3}
													open={Dropdown3}
													onClose={handleCloselanguage}
													PaperProps={{
														elevation: 0,
														sx: {
															overflow: 'visible',
															filter:
																'drop-shadow(0px 2px 5px rgba(0,0,0,0.15))',
															mt: 1.5,
															'& > ul': { padding: 0 },
															maxWidth: 'auto',
															width: 'auto',
														},
													}}
												>
													<MenuItem className='bulk_alert' disabled>
														<Typography
															component={'label'}
															className='bulk_alert_item fileUpload'
														>
															<DownloadIcon />
															Export CSV
														</Typography>
													</MenuItem>
													<MenuItem className='bulk_alert'>
														<Typography
															component={'label'}
															className='bulk_alert_item fileUpload'
														>
															<InputBase
																type='file'
																accept='.csv'
																sx={{ opacity: '0', visibility: 'hidden' }}
																onChange={(e) => {
																	handleBulkUpload(e);
																	setDropdown3(false);
																}}
															/>
															<UploadIcon />
															Import CSV
														</Typography>
													</MenuItem>
													<MenuItem className='bulk_alert'>
														<Typography
															component={'label'}
															className='bulk_alert_item fileUpload'
														>
															<InputBase
																type='file'
																accept='.csv'
																sx={{ opacity: '0', visibility: 'hidden' }}
																onChange={(e) => {
																	handleBulkUpload(e);
																	setDropdown3(false);
																}}
															/>
															<UploadIcon />
															Import TT CSV
														</Typography>
													</MenuItem>
													<MenuItem className='bulk_alert'>
														<Typography
															component={'label'}
															className='bulk_alert_item fileUpload'
														>
															<CloudDownloadRoundedIcon />
															<CSVLink
																// target='_blank'
																filename={`sample.csv`}
																data={csvData}
															>
																Download Sample CSV
															</CSVLink>
														</Typography>
													</MenuItem>

													<MenuItem className='bulk_alert'>
														<Typography
															component={'label'}
															className='bulk_alert_item fileUpload'
														>
															<CloudDownloadRoundedIcon />
															<CSVLink
																// target='_blank'
																filename={`sample.csv`}
																data={ttCSVData}
															>
																Download Sample TT CSV
															</CSVLink>
														</Typography>
													</MenuItem>
													<MenuItem className='bulk_alert'>
														<Typography
															onClick={handleOpenHelp}
															component={'label'}
															className='bulk_alert_item fileUpload'
														>
															<HelpOutlineRoundedIcon />
															Help
														</Typography>
													</MenuItem>
												</Menu>
											</Box>
										</Box>
										<Box className='alertBox-item'>
											<Button
												className='del'
												sx={{ color: '#FF231F' }}
												disabled={selectedRows.length > 0 ? false : true}
												onClick={() => handlePopup(true)}
											>
												<svg
													width='14'
													height='16'
													viewBox='0 0 14 16'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M13.2812 1.4375H9.76562L9.49023 0.889653C9.4319 0.772529 9.34204 0.674006 9.23076 0.605169C9.11948 0.536332 8.9912 0.499911 8.86035 0.500005H5.51172C5.38117 0.499503 5.25311 0.535788 5.14223 0.604701C5.03134 0.673615 4.94212 0.772371 4.88477 0.889653L4.60938 1.4375H1.09375C0.96943 1.4375 0.850201 1.48689 0.762294 1.5748C0.674386 1.66271 0.625 1.78193 0.625 1.90625L0.625 2.84375C0.625 2.96807 0.674386 3.0873 0.762294 3.17521C0.850201 3.26312 0.96943 3.3125 1.09375 3.3125H13.2812C13.4056 3.3125 13.5248 3.26312 13.6127 3.17521C13.7006 3.0873 13.75 2.96807 13.75 2.84375V1.90625C13.75 1.78193 13.7006 1.66271 13.6127 1.5748C13.5248 1.48689 13.4056 1.4375 13.2812 1.4375ZM2.18359 14.1816C2.20595 14.5387 2.36352 14.8737 2.62424 15.1187C2.88495 15.3636 3.2292 15.5 3.58691 15.5H10.7881C11.1458 15.5 11.4901 15.3636 11.7508 15.1187C12.0115 14.8737 12.169 14.5387 12.1914 14.1816L12.8125 4.25H1.5625L2.18359 14.1816Z'
														fill='currentColor'
														fillOpacity='0.56'
													/>
												</svg>
												DeleteAlert (S)
											</Button>
										</Box>
									</Box>
								</Grid>

								<Grid item xs={12} md={6}>
									<Box className='newAlert' justifyContent={'end'}>
										<Box className='newAlert-item'>
											<Typography component={'p'}>
												{alertList?.length} Alert
											</Typography>
										</Box>

										<Box className='newAlert-item'>
											<Button className='refresh-btn' onClick={getAlertList}>
												<svg
													width='16'
													height='16'
													viewBox='0 0 16 16'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M14.8837 9.20091C14.6743 9.13557 14.4474 9.15575 14.2528 9.25706C14.0581 9.35836 13.9113 9.53257 13.8445 9.7417C13.4517 10.9435 12.6859 11.9885 11.6586 12.7247C10.6313 13.461 9.39603 13.8499 8.13253 13.8351C6.56973 13.8529 5.06367 13.2498 3.94459 12.158C2.82552 11.0662 2.18477 9.57496 2.16286 8.01115C2.18477 6.44735 2.82552 4.95606 3.94459 3.8643C5.06367 2.77254 6.56973 2.16942 8.13253 2.18719C9.54395 2.18378 10.9119 2.67541 11.9987 3.57662L10.1945 3.27711C10.0863 3.2593 9.97577 3.26306 9.8691 3.28817C9.76243 3.31329 9.66177 3.35925 9.57291 3.42343C9.48405 3.4876 9.40875 3.56872 9.35133 3.66212C9.29391 3.75552 9.25551 3.85936 9.23833 3.96766C9.22054 4.07586 9.2243 4.18652 9.2494 4.29326C9.27449 4.40001 9.32042 4.50074 9.38455 4.58965C9.44869 4.67857 9.52975 4.75393 9.62309 4.81138C9.71642 4.86884 9.82019 4.90727 9.92842 4.92445L13.4537 5.50685H13.595C13.6914 5.50674 13.7871 5.48985 13.8777 5.45693C13.9082 5.44536 13.9363 5.42846 13.9609 5.40701C14.0205 5.38483 14.0765 5.35399 14.1271 5.31549L14.202 5.22397C14.202 5.18237 14.2768 5.14909 14.3101 5.09917C14.3433 5.04925 14.3101 5.01597 14.3516 4.98269C14.3746 4.93424 14.3941 4.88419 14.4098 4.83294L15.0334 1.50496C15.0541 1.3957 15.0532 1.28342 15.0306 1.17453C15.008 1.06565 14.9641 0.962285 14.9016 0.870349C14.8391 0.778412 14.759 0.699701 14.6661 0.63871C14.5732 0.57772 14.4691 0.535644 14.3599 0.514884C14.2508 0.494125 14.1386 0.495089 14.0297 0.517722C13.9209 0.540355 13.8176 0.584212 13.7258 0.646791C13.5402 0.773175 13.4124 0.968141 13.3705 1.1888L13.1461 2.39519C11.7542 1.18817 9.9743 0.523563 8.13253 0.523204C6.12873 0.505456 4.19973 1.28389 2.76881 2.6877C1.33789 4.09152 0.521942 6.00603 0.5 8.01115C0.521942 10.0163 1.33789 11.9308 2.76881 13.3346C4.19973 14.7384 6.12873 15.5169 8.13253 15.4991C9.75643 15.5241 11.3454 15.0266 12.6656 14.08C13.9858 13.1334 14.9673 11.7877 15.4657 10.2409C15.4973 10.1344 15.5072 10.0226 15.4949 9.91221C15.4825 9.8018 15.4482 9.69497 15.394 9.59804C15.3398 9.50111 15.2667 9.41603 15.179 9.34782C15.0914 9.27961 14.991 9.22966 14.8837 9.20091Z'
														fill='currentColor'
														fillOpacity='0.56'
													/>
												</svg>
											</Button>
										</Box>
									</Box>
								</Grid>

								<Grid item xs={12} md={6}>
									<TableSearch
										handleChange={handleSearch}
										placeholder='Enter Alert'
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<Box className='selectiondiv-box'>
										<Dropdown
											title={title}
											val={statusValues}
											value={statusSearch}
											handleChange={handleDropdownChange}
										/>
									</Box>
								</Grid>
							</Grid>

							<Table
								col={col}
								rows={alertList}
								page={page}
								isLoading={isLoading}
								rowsPerPage={rowsPerPage}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</Box>
					</Grid>
				</Grid>

				{/* Bulk Alert Help Modal */}
				<Dialog
					open={openHelp}
					onClose={handleCloseHelp}
					className='commonModal HelpModal'
				>
					<Box className='modalHeader' sx={{ justifyContent: 'end' }}>
						<Typography component={'h4'}>Bulk Alerts Help</Typography>
						<Button onClick={handleCloseHelp} className='closeModal'>
							<img src={close} />
						</Button>
					</Box>
					<DialogContent sx={{ padding: '0' }} className='modalBody'>
						<DialogContentText sx={{ padding: '0' }}>
							<Box className='helpContent '>
								<Box className='helpContent_item'>
									<Typography component={'p'}>
										You can easily create bulk alerts by uploading a CSV with
										the relevant details. Below is a brief description of each
										column needed in the CSV. You can also download an example
										CSV below that can be filled in. If you want to create
										modified version of the current active alerts, you can check
										mark them and export to CSV also.
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Exchange:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										This is the exchange you want to create alert for. Possible
										values are: 'NSE', 'BSE', 'NFO', 'BCD', 'MCX.'
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>ScripName:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										Enter the symbol for the instrument or the underlying symbol
										if creating alert for future or option.
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Expiry:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										Enter the expiry of future/option. Leave blank if not
										applicable. Date format is DD-MM-YYYY. Ex 01-12-2019
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Type:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										Enter the type of derivative. Leave blank if not applicable.
										Possible values are: CE, PE, FUT.
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Strike:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										Enter the strike price if creating alert for options. Leave
										blank if not applicable.
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>ScripCode:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										Enter the ScripCode or exchange token of the instrument. If
										this is provided, the other instrument values are ignored.
										Leave blank if not needed.
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Condition:</Typography>
										<Typography component={'span'}>[Required]</Typography>
									</Box>
									<Typography component={'p'}>
										Condition when alert should be sent. Possible values are and
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Rate:</Typography>
										<Typography component={'span'}>[Required]</Typography>
									</Box>
									<Typography component={'p'}>
										Price at which alert should be sent.
									</Typography>
								</Box>

								<Box className='helpContent_item'>
									<Box className='helpContent_title'>
										<Typography component={'h5'}>Message:</Typography>
										<Typography component={'span'}>[Optional]</Typography>
									</Box>
									<Typography component={'p'}>
										Message to be sent in the alert.
									</Typography>
								</Box>
							</Box>
							{/* <Box sx={{ marginTop: 2 }}>
              <Button
                onClick={handleClose}
                className="modal-btn btn-primary"
                sx={{ maxWidth: "16rem !important" }}
              >
                Download Template
              </Button>
            </Box> */}
						</DialogContentText>
					</DialogContent>
				</Dialog>

				{/* clone dialog */}
				<Dialog
					open={open}
					onClose={handleClose}
					className='commonModal'
					sx={{ width: '-webkit-fill-available' }}
				>
					<Box className='modalHeader' sx={{ justifyContent: 'end' }}>
						<Typography component={'h4'}>Create Alert</Typography>
						<Button onClick={handleClose} className='closeModal'>
							<img src={close} />
						</Button>
					</Box>
					<DialogContent
						sx={{ padding: '0', width: 450 }}
						className='modalBody'
					>
						<DialogContentText sx={{ padding: '0' }}>
							<Box
								className='formItems inputFields fullWidth space'
								sx={{ marginTop: 2 }}
							>
								<InputBase
									value={
										editElement?.symbol +
										' ' +
										parseFloat(editElementPrice).toFixed(2)
									}
								/>
							</Box>
							<Box className='formItems alertStyle'>
								<Typography component={'label'} className='label'>
									Alert when LTP is
								</Typography>
								<FormControl className='inputFields ' sx={{ display: 'block' }}>
									<RadioGroup row value={condition} onChange={handleCondition}>
										<FormControlLabel
											value='Above'
											sx={{ marginRight: '2.5rem' }}
											control={<Radio />}
											label='Above'
										/>
										<FormControlLabel
											value='Below'
											sx={{ marginRight: '2.5rem' }}
											control={<Radio />}
											label='Below'
										/>
									</RadioGroup>
								</FormControl>
							</Box>

							<Box className='formItems'>
								{/* <Typography component={"label"} className="label">
                Value
              </Typography> */}
								<Box
									sx={{ position: 'relative', marginTop: 1, marginBottom: 2 }}
								>
									<Box className='selectionDiv bn searchFlex'>
										<Box className='inputFields fullWidth'>
											<InputBase
												placeholder='Value'
												value={value}
												onChange={handleValue}
												type='number'
											/>
										</Box>
									</Box>
									<Button
										className='solidButton counterBtn'
										sx={minus}
										onClick={handleDecrement}
									>
										-
									</Button>
									<Button
										className='solidButton counterBtn'
										sx={plus}
										onClick={handleIncrement}
									>
										+
									</Button>
								</Box>
							</Box>

							<Box className='formItems inputFields fullWidth space'>
								{/* <Typography component={"label"} className="label">
                Message
              </Typography> */}
								<TextField
									value={message}
									multiline
									alertList={4}
									placeholder='Message'
									onChange={handleMessage}
								/>
							</Box>

							<Box
								className='formItems'
								sx={{
									display: { xs: 'block', md: 'flex' },
									justifyContent: { md: 'space-between' },
									marginTop: 2,
								}}
							>
								<Button
									className='formSolid-btn'
									sx={{ marginBottom: 2 }}
									onClick={createAlert}
								>
									Create Alert
								</Button>
								<Button
									className='customize-btn'
									sx={{ marginBottom: 2 }}
									onClick={handleClose}
									style={{ color: 'black' }}
								>
									Close
								</Button>
							</Box>
						</DialogContentText>
					</DialogContent>
				</Dialog>

				{/* edit dialog */}
				<Dialog
					open={editOpen}
					onClose={handleEditClose}
					className='commonModal'
					sx={{ width: '-webkit-fill-available' }}
				>
					<Box className='modalHeader' sx={{ justifyContent: 'end' }}>
						<Typography component={'h4'}>Update Alert</Typography>
						<Button onClick={handleEditClose} className='closeModal'>
							<img src={close} />
						</Button>
					</Box>
					<DialogContent
						sx={{ padding: '0', width: 450 }}
						className='modalBody'
					>
						<DialogContentText sx={{ padding: '0' }}>
							<Box
								className='formItems inputFields fullWidth space'
								sx={{ marginTop: 2 }}
							>
								<InputBase
									value={
										editElement?.symbol +
										' ' +
										parseFloat(editElementPrice).toFixed(2)
									}
								/>
							</Box>
							<Box className='formItems alertStyle'>
								<Typography component={'label'} className='label'>
									Alert when LTP is
								</Typography>
								<FormControl className='inputFields ' sx={{ display: 'block' }}>
									<RadioGroup row value={condition} onChange={handleCondition}>
										<FormControlLabel
											value='Above'
											sx={{ marginRight: '2.5rem' }}
											control={<Radio />}
											label='Above'
										/>
										<FormControlLabel
											value='Below'
											sx={{ marginRight: '2.5rem' }}
											control={<Radio />}
											label='Below'
										/>
									</RadioGroup>
								</FormControl>
							</Box>

							<Box className='formItems'>
								{/* <Typography component={"label"} className="label">
                Value
              </Typography> */}
								<Box
									sx={{ position: 'relative', marginTop: 1, marginBottom: 2 }}
								>
									<Box className='selectionDiv bn searchFlex'>
										<Box className='inputFields fullWidth'>
											<InputBase
												placeholder='Value'
												value={value}
												onChange={handleValue}
												type='number'
											/>
										</Box>
									</Box>
									<Button
										className='solidButton counterBtn'
										sx={minus}
										onClick={handleDecrement}
									>
										-
									</Button>
									<Button
										className='solidButton counterBtn'
										sx={plus}
										onClick={handleIncrement}
									>
										+
									</Button>
								</Box>
							</Box>

							<Box className='formItems inputFields fullWidth space'>
								{/* <Typography component={"label"} className="label">
                Message
              </Typography> */}
								<TextField
									value={message}
									multiline
									alertList={4}
									placeholder='Message'
									onChange={handleMessage}
								/>
							</Box>

							<Box
								className='formItems'
								sx={{
									display: { xs: 'block', md: 'flex' },
									justifyContent: { md: 'space-between' },
									marginTop: 2,
								}}
							>
								<Button
									className='formSolid-btn'
									sx={{ marginBottom: 2 }}
									onClick={handleUpdateData}
								>
									Update Alert
								</Button>
							</Box>
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</>

			<Dialog
				open={popup}
				onClose={handleClose}
				className='commonModal squareOff'
			>
				<Box className='modalHeader' sx={{ justifyContent: 'end' }}>
					<Typography component={'h4'}>Delete</Typography>
					<Button onClick={() => handlePopup(false)} className='closeModal'>
						<img src={close} />
					</Button>
				</Box>
				<DialogContent sx={{ padding: '0' }} className='modalBody'>
					<DialogContentText sx={{ padding: '0' }}>
						<Box className='alertIcons'>
							<svg
								width='1052'
								height='1052'
								viewBox='0 0 1052 1052'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z'
									fill='#4987FE'
								/>
								<circle
									cx='526'
									cy='526'
									r='507'
									stroke='#5086EE'
									stroke-width='38'
								/>
							</svg>
						</Box>
						<Typography
							component={'h4'}
							sx={{
								fontSize: '1.8rem',
								textAlign: 'center',
								marginTop: '2rem',
							}}
							className='alertText'
						>
							Are You Sure You Want Delete!
						</Typography>

						<Box sx={{ display: { xs: 'flex' }, marginTop: 2 }}>
							<Button
								onClick={() => handlePopup(false)}
								className='modal-btn btn-danger'
								sx={{ marginRight: '0.5rem' }}
							>
								Discard
							</Button>
							<Button
								onClick={handleBulkDelete}
								className='modal-btn btn-primary'
								sx={{ marginLeft: '0.5rem' }}
							>
								Confirm
							</Button>
						</Box>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</>
	);
}
