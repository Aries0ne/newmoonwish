import { toast } from 'react-toastify';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { API_URL } from '../../config';
import { generatePopup } from '../../utils/popup';

export const getAlertData =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');
			dispatch({ type: actionTypes.GET_ALERT_INIT });
			axios
				.get(`${API_URL}/auth/alert/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						dispatch({
							type: actionTypes.GET_ALERT_ADMIN_SUCCESS,
							payload: res.data,
						});
						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.GET_ALERT_ADMIN_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.GET_ALERT_ADMIN_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');
						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};

export const getAlertSegmentSymbols = (payload) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({
			type: actionTypes.GET_SEGMENT_SYMBOL_ALERT_SUCCESS,
			payload: payload,
		});
		resolve();
	});
};

// export const getAlertSegmentSymbols = (segment) => (dispatch) => {
//   return new Promise((resolve, reject) => {
//     let token = localStorage.getItem("token");

//     axios
//       .get(`${API_URL}/auth/${segment}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           dispatch({
//             type: actionTypes.GET_SEGMENT_SYMBOL_ALERT_SUCCESS,
//             payload: res.data,
//           });
//           resolve(res.data);
//         } else {
//           dispatch({
//             type: actionTypes.GET_SEGMENT_SYMBOL_ALERT_FAIL,
//           });
//         }
//       })
//       .catch((error) => {
//         if (error.response.status === 400) {
//           dispatch({
//             type: actionTypes.GET_SEGMENT_SYMBOL_ALERT_FAIL,
//           });
//         } else if (error?.response?.status === 401) {
//           generatePopup("error", "Token is invalid or expired.");
//           localStorage.clear();
//           window.location.replace("/");
//         }
//       });
//   });
// };

export const getAlertFutureData = (payload) => (dispatch) => {
	return new Promise((resolve, reject) => {
		let token = localStorage.getItem('token');

		axios
			.post(`${API_URL}/auth/future/`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: actionTypes.FUTURE_ALERT_DATA_SUCCESS,
						payload: res.data,
					});
					resolve(res.data);
				} else {
					dispatch({
						type: actionTypes.FUTURE_ALERT_DATA_SUCCESS,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					dispatch({
						type: actionTypes.GET_SEGMENT_SYMBOL_ALERT_FAIL,
					});
				} else if (error?.response?.status === 401) {
					generatePopup('error', 'Token is invalid or expired.');
					localStorage.clear();
					window.location.replace('/');
				}
			});
	});
};

export const getAlertOptionData = (payload, optionType) => (dispatch) => {
	return new Promise((resolve, reject) => {
		let token = localStorage.getItem('token');

		axios
			.post(`${API_URL}/auth/${optionType}/`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: actionTypes.OPTION_ALERT_DATA_SUCCESS,
						payload: res.data.expiry,
					});
					resolve(res.data.expiry);
				} else {
					dispatch({
						type: actionTypes.OPTION_ALERT_DATA_FAIL,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					dispatch({
						type: actionTypes.OPTION_ALERT_DATA_FAIL,
					});
				} else if (error?.response?.status === 401) {
					generatePopup('error', 'Token is invalid or expired.');
					localStorage.clear();
					window.location.replace('/');
				}
			});
	});
};

export const getAlertOptionStrikeData = (payload, optionType) => (dispatch) => {
	return new Promise((resolve, reject) => {
		let token = localStorage.getItem('token');

		axios
			.post(`${API_URL}/auth/${optionType}/`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: actionTypes.OPTION_STRIKE_DATA_SUCCESS,
						payload: res.data,
					});
					resolve(res.data);
				} else {
					dispatch({
						type: actionTypes.OPTION_STRIKE_DATA_FAIL,
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					dispatch({
						type: actionTypes.OPTION_STRIKE_DATA_FAIL,
					});
				} else if (error?.response?.status === 401) {
					generatePopup('error', 'Token is invalid or expired.');
					localStorage.clear();
					window.location.replace('/');
				}
			});
	});
};

export const sendAlertData =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');

			axios
				.post(`${API_URL}/auth/alert/`, payload, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.status === 201) {
						dispatch({
							type: actionTypes.SEND_ALERT_ADMIN_SUCCESS,
							payload: res.data,
						});
						if (res?.data?.status) {
							generatePopup('success', 'Alert created succesfully.');
						} else {
							generatePopup('error', res?.data?.message);
						}
						dispatch(getAlertData());
						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.SEND_ALERT_ADMIN_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.SEND_ALERT_ADMIN_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');
						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};

export const updateAlertData =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');

			axios
				.put(`${API_URL}/auth/alert/`, payload, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.status === 201) {
						dispatch({
							type: actionTypes.UPDATE_ALERT_SUCCESS,
							payload: res.data,
						});
						generatePopup('success', 'Alert updated succesfully.');
						dispatch(getAlertData());
						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.UPDATE_ALERT_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.UPDATE_ALERT_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');
						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};

export const deleteAlertData =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');
			axios
				.delete(`${API_URL}/auth/alert/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					data: payload,
				})
				.then((res) => {
					if (res.status === 201) {
						dispatch({
							type: actionTypes.DELETE_ALERT_SUCCESS,
							payload: res.data,
						});
						generatePopup('success', 'Alert deleted succesfully.');
						dispatch(getAlertData());
						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.DELETE_ALERT_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.DELETE_ALERT_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');

						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};

export const deleteBulkAlertData =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');
			axios
				.delete(`${API_URL}/auth/bulkdelete/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					data: payload,
				})
				.then((res) => {
					if (res.status === 201) {
						dispatch({
							type: actionTypes.DELETE_BULK_ALERT_SUCCESS,
							payload: res.data,
						});
						generatePopup('success', 'All alert deleted succesfully.');
						dispatch(getAlertData());
						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.DELETE_BULK_ALERT_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.DELETE_BULK_ALERT_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');

						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};

export const uploadBulkAlertData =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');
			axios
				.post(`${API_URL}/auth/alertbulk/`, payload, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						dispatch({
							type: actionTypes.UPLOAD_BULK_ALERT_SUCCESS,
							payload: res.data,
						});
						generatePopup('success', 'All alert added succesfully.');
						dispatch(getAlertData());
						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.UPLOAD_BULK_ALERT_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.UPLOAD_BULK_ALERT_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');

						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};

export const getAlertPrice =
	(payload = {}) =>
	(dispatch) => {
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('token');

			axios
				.post(`${API_URL}/auth/alertprice/`, payload, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						dispatch({
							type: actionTypes.GET_ALERT_PRICE_SUCCESS,
							payload: res.data,
						});

						resolve(res.data);
					} else {
						dispatch({
							type: actionTypes.GET_ALERT_PRICE_FAIL,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						dispatch({
							type: actionTypes.SEND_ALERT_ADMIN_FAIL,
						});
					} else if (error?.response?.status === 401) {
						generatePopup('error', 'Token is invalid or expired.');
						localStorage.clear();
						window.location.replace('/');
					}
				});
		});
	};
