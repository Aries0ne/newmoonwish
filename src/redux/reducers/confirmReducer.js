import {
	CLOSE_CONFIRM_DIALOG,
	OPEN_CONFIRM_DIALOG,
	SET_CONFRIM,
	SET_INTIAL_STATE,
} from '../actionTypes';

const initialState = {
	open: false,
	message: 'Are you sure you want to continue?',
	isConfirm: false,
};

const store = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_CONFIRM_DIALOG:
			return {
				...state,
				open: true,
				message: action.payload,
			};
		case CLOSE_CONFIRM_DIALOG:
			return {
				...state,
				open: false,
				isConfirm: false,
			};
		case SET_CONFRIM:
			return {
				...state,
				isConfirm: true,
				open: false,
			};
		case SET_INTIAL_STATE:
			return initialState;
		default:
			return state;
	}
};

export default store;
