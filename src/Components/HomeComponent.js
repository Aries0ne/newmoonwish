import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	FormControlLabel,
	Grid,
	InputBase,
	Radio,
	RadioGroup,
	Switch,
	Tab,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

import Dropdown from '../Inauth/Dropdown/Dropdown.js';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Inauth/Home/Home.scss';
import Strategy from '../Inauth/Strategy/Strategy';
import close from '../images/close.png';
import user from '../images/user.png';
import {
	addWatchList,
	deleteWatchList,
} from '../redux/actions/commonActions.js';
import { createPosition } from '../redux/actions/positionAction.js';
import { generatePopup } from '../utils/popup.js';
import { useSocket } from '../hooks/useNewSocket.js';

const HomeComponent = (props) => {
	const { drpValue } = props;

	const dispatch = useDispatch();

	const [chartwidth, setchartwidth] = useState('97%');
	const [card, setcard] = useState(4);
	const [value1, setValue1] = useState('screener1');
	const [tabhight, settabhight] = useState('0');
	const [sidechartwidth, setsidechartwidth] = useState('3%');
	const [block, setblock] = useState('none');
	const [hidden, sethidden] = useState('none');
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState('NSE');
	const [bsopen, setbsopen] = useState(false);
	const [sell, setbuy] = useState('buy');
	const [buysell, setbuysell] = useState('Buy');
	const [watchlist, setWatchlist] = useState([]);
	const [search, setSearch] = useState('');
	const [value, setValue] = useState('maintab1');
	const [selectedStock, setSelectedStock] = useState();
	const [orderType, setOrderType] = useState('Market');
	const [prc, setPrc] = useState(0);
	const [qty, setQty] = useState(0);
	const [prdType, setPrdType] = useState('MIS');

	const watchListData = useSelector(
		(state) => state?.CommonReducer?.watchListData
	);
	
	const watchListSocket = useSocket('watchlist');


	const watchListLive = useSelector(
		(state) => state?.CommonReducer?.watchListLive
	);

	// Sidebar
	// const handleToggler = () => {
	//   if (chartwidth === "97%") {
	//     setchartwidth("70%");
	//     setsidechartwidth("30%");
	//     setblock("block");
	//     setcard(6);
	//   } else {
	//     setchartwidth("97%");
	//     setsidechartwidth("3%");
	//     setblock("none");
	//     setcard(4);
	//   }
	// };

	// Bottom tabs
	const setTabs = () => {
		if (tabhight === '0') {
			settabhight('30rem');
			sethidden('block');
		} else {
			settabhight('0');
			sethidden('none');
		}
	};

	// Add Symbol Modal
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// Buy/Sell Modal
	const buysellOpen = (value, stock) => {
		setSelectedStock(stock);
		setbuy(value);
		setbuysell(value);
		setbsopen(true);
	};
	const buysellClose = () => {
		setbsopen(false);
	};
	const buysellpopup = () => {
		if (sell === 'buy') {
			setbuy('sell');
			setbuysell('sell');
		} else {
			setbuy('buy');
			setbuysell('buy');
		}
	};

	const handleChange = (e, newValue = 'string') => {
		setValue(newValue);
	};

	// Add Symbol Button
	const handleAlignment = (e, newAlignment) => {
		setActive(newAlignment);
		searchSocket();
	};

	// Main tab
	const handleSChange = (e, newValue = 'string') => {
		setValue1(newValue);
	};

	const searchSocket = async () => {
		if (watchListSocket?.isConnected) {
			watchListSocket.sendMessage({
				exchange: active,
				symbol: search.length === 0 ? 'NA' : search.toUpperCase(),
			});
		}
	};

	useEffect(() => {
		searchSocket();
	}, [search, watchListSocket]);

	const handleSearch = (e) => {
		const { value } = e.target;
		setSearch(value);
	};

	useEffect(() => {
		setWatchlist(watchListData);
	}, [watchListData]);

	const addWatchListData = (obj) => {
		dispatch(addWatchList(obj));
	};

	const removeWatchList = (obj) => {
		dispatch(deleteWatchList(obj));
	};

	const handlePrdChange = (e) => {
		setPrdType(e.target.value);
	};

	const createTrade = () => {
		if (qty == 0) {
			return generatePopup('error', 'Please enter quantity.');
		}

		let obj = {
			symbol: selectedStock?.symbol,
			product: prdType,
			exchange: selectedStock?.exchange,
			prctyp: orderType.toUpperCase(),
			quantity: qty,
			side: buysell.toUpperCase(),
			complexty: 'REGULAR',
			signaltype: buysell == 'buy' ? 'Entry' : 'Exit',
			strikeprice: Number(selectedStock?.strikeprice),
			prc: prc,
			expiry: selectedStock?.expiry,
			type:
				selectedStock?.option == 'AA'
					? 'CASH'
					: selectedStock?.option == 'XX'
					? 'FUTURE'
					: 'OPTION',
			tag:
				selectedStock?.option == 'CE'
					? 'CE'
					: selectedStock?.option == 'PE'
					? 'PE'
					: 'NA',
		};

		dispatch(createPosition(obj));
		buysellClose();
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box className='border-ap'>
						<Box className='strategyBox'>
							<Strategy card={card} />
						</Box>
					</Box>
				</Grid>
			</Grid>

			{/* Add Symbol Modal */}
			<Dialog
				open={open}
				onClose={handleClose}
				className='commonModal addSymbol'
				My
				fullWidth
			>
				<Box className='modalHeader' sx={{ justifyContent: 'space-between' }}>
					<Typography component={'h4'}>Add Symbol</Typography>
					<Button onClick={handleClose} className='closeModal'>
						<img src={close} />
					</Button>
				</Box>
				<DialogContent sx={{ padding: '0' }} className='modalBody'>
					<DialogContentText sx={{ padding: '0' }}>
						<Box className='inputFields fullWidth'>
							<InputBase placeholder='Search Here...' onChange={handleSearch} />
							<Box className='searchIcon'>
								<svg
									width='18'
									height='18'
									viewBox='0 0 18 18'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M7.85722 14.7144C11.6444 14.7144 14.7144 11.6444 14.7144 7.85722C14.7144 4.07008 11.6444 1 7.85722 1C4.07008 1 1 4.07008 1 7.85722C1 11.6444 4.07008 14.7144 7.85722 14.7144Z'
										stroke='#6A6D78'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M13 13.0001L17 17.0002'
										stroke='#6A6D78'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</Box>
						</Box>

						<ToggleButtonGroup
							value={active}
							exclusive
							onChange={handleAlignment}
							className='toggleButton'
						>
							<ToggleButton value='NSE'>NSE</ToggleButton>
							<ToggleButton value='NFO'>NFO</ToggleButton>
							<ToggleButton value='CDS'>CDS</ToggleButton>
							<ToggleButton value='MCX'>MCX</ToggleButton>
						</ToggleButtonGroup>

						<Box className='border-ap addSymbolList-box' sx={{ marginTop: 2 }}>
							{watchlist?.map((d, i) => {
								return (
									<Box className='addSymbolList' key={'symbollist' + i}>
										<Box className='addSymbol-actions'>
											<Button className='addSymbol-btn'>
												<KeyboardArrowRightIcon />
											</Button>
										</Box>
										<Box className='symbols pText'>
											<img className='symbolImg' src={user} />
											<Typography>{d?.tradingsymbol}</Typography>
										</Box>
										<Box className='symbolName pText'>
											<Typography component={'p'}>{d?.symbol}</Typography>
										</Box>
										<Box className='exchangeSell pText'>
											<Typography component={'span'}>Stock</Typography>
											<Typography component={'p'}>{d?.exchange}</Typography>
											<img className='symbolImg' src={user} />
										</Box>
										<Box className='addSymbol-actions last'>
											<Button
												className='addSymbol-btn'
												onClick={() => addWatchListData(d)}
											>
												<LocationSearchingIcon />
											</Button>
										</Box>
									</Box>
								);
							})}
						</Box>
					</DialogContentText>
				</DialogContent>
			</Dialog>

			{/* Buy/Sell */}
			<Dialog
				open={bsopen}
				onClose={buysellClose}
				className={`commonModal buysellModal ${sell}`}
			>
				<DialogContent sx={{ padding: '0 !important' }} className='modalBody'>
					<DialogContentText sx={{ padding: '0' }}>
						<Box className='buysell-box' sx={{ backgroundColor: sell }}>
							<Box className='buysell_header'>
								<Typography component={'h4'} className='symbol'>
									{buysell.toUpperCase()} {selectedStock?.symbol}
									<Typography component={'small'} className='symbol_type'>
										{selectedStock?.exchange}
									</Typography>
									<Typography component={'p'} className='symbol_qty'>
										X 1 Qty
									</Typography>
								</Typography>
							</Box>
							<Switch onChange={buysellpopup} />
						</Box>
						<Box className='tabs buysellModal-tabs'>
							<TabContext value={value} className='tabBox'>
								<TabList
									className='main-tab border-ap  '
									onChange={handleChange}
								>
									<Tab label='Regular' value={'maintab1'} />
								</TabList>

								<Box className='tabBox' sx={{ border: 'none !important' }}>
									<TabPanel
										value={'maintab1'}
										className='sub-tabs'
										sx={{ padding: 1 }}
									>
										<Box
											className='formBox'
											sx={{
												border: 'none',
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												marginTop: 2,
												'& > .formItems': {
													width: { xs: '100%', md: 'calc(50% - 1rem)' },
												},
											}}
										>
											<Box className='formItems'>
												<Typography
													component={'label'}
													className='label'
													sx={{ fontSize: '1.4rem !important' }}
												>
													Quantity
												</Typography>
												<Box className='inputFields space fullWidth'>
													<InputBase
														type='number'
														placeholder='Quantity'
														onChange={(e) => setQty(Number(e.target.value))}
													/>
												</Box>
											</Box>
											<Box className='formItems' sx={{ padding: '0 0.4rem' }}>
												<Typography
													component={'label'}
													className='label'
													sx={{ fontSize: '1.4rem !important' }}
												>
													TradeType
												</Typography>
												<Box
													className='inputFields space fullWidth'
													sx={{
														'& > .selectionDiv': {
															padding: '0 !important',
															marginTop: '0 !important',
															border: 'none !important',
														},
													}}
												>
													<Dropdown
														val={drpValue}
														value={prdType}
														handleChange={handlePrdChange}
													/>
												</Box>
											</Box>
											<Box className='formItems' sx={{ padding: '0 0.4rem' }}>
												<Typography
													component={'label'}
													className='label'
													sx={{ fontSize: '1.4rem !important' }}
												>
													Price
												</Typography>
												<Box className='inputFields space fullWidth'>
													<InputBase
														placeholder='Price'
														type='number'
														disabled={orderType == 'Market'}
														onChange={(e) => setPrc(e.target.value)}
													/>
												</Box>

												<Box className='formItems buysell-radio'>
													<Box className='inputFields space fullWidth'>
														<RadioGroup
															row
															value={orderType}
															onChange={(e) => setOrderType(e.target.value)}
														>
															<FormControlLabel
																value='Market'
																sx={{ marginRight: '2.5rem' }}
																control={<Radio />}
																label='Market'
															/>
															<FormControlLabel
																value='Limit'
																sx={{ marginRight: '2.5rem' }}
																control={<Radio />}
																label='Limit'
															/>
														</RadioGroup>
													</Box>
												</Box>
											</Box>
										</Box>
									</TabPanel>
								</Box>
							</TabContext>
						</Box>

						<Box className='buysell-footer'>
							<Box className='margin'>
								<Typography component={'p'}>
									Margin ₹ 493.70 Charges ₹ 2.17
								</Typography>
								<Button>
									<RefreshIcon />
								</Button>
							</Box>

							<Box className='footer-btn'>
								<Button onClick={() => createTrade()}>{buysell}</Button>
								<Button onClick={buysellClose}>Cancel</Button>
							</Box>
						</Box>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default HomeComponent;
