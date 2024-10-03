import { OPEN_CONFIRM_DIALOG } from '../actionTypes';
import store from '../store';

export const confirm = (message) => {
	return new Promise((resolve, reject) => {
		store.dispatch({
			type: OPEN_CONFIRM_DIALOG,
			payload: message,
		});

		const unsubscription = store.subscribe(() => {
			const state = store?.getState()?.Confirm;
			if (state.open === false) {
				unsubscription(); // Unsubscribe from store updates
				if (state.isConfirm === true) {
					resolve();
				} else {
					reject(new Error('User canceled'));
				}
			}
		});
	});
};
