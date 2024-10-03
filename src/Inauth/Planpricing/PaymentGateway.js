import axios from 'axios';
import { API_URL } from '../../config';

export const displayRazorPay = async (onError, onSuccess, plan) => {
	console.log('razor pay called');
	const token = localStorage.getItem('token');
	const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

	if (!res) {
		onError();
		return;
	}

	const payload = {
		plan: plan,
	};
	const response = await axios.post(`${API_URL}/auth/planvalue/`, payload, {
		headers: { Authorization: `Bearer ${token}` },
	});

	const data = response.data;

	const userRes = await axios.get(`${API_URL}/auth/user/`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	const user = userRes?.data[0];

	console.log('user in response', user);

	const options = {
		// key: 'rzp_live_FszRm0UAwMx601',
		key: 'rzp_live_8UAXkz5sJhvbou',
		currency: data?.currency,
		amount: data?.total_amount,
		order_id: data.order_id,
		name: 'Asmita Patel Global School Of Trading',
		image: 'https://emailwala.s3.ap-south-1.amazonaws.com/MooonWish+logo.jpeg',
		handler: async (response) => {
			console.log('response in handler', response);
			const invoicePayload = {
				status: 'complete',
				// method: 'cash',
				amount: data.amount,
				gst: data.gst,
				gateway_fee: data.gateway_fee,
				total_amount: data.total_amount,
				order_id: data.order_id,
				payment_id: response?.razorpay_payment_id,
				plan,
			};

			const invoiceRes = await axios.post(
				`${API_URL}/auth/getinvoice/`,
				invoicePayload,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (invoiceRes.data.status === true) {
				onSuccess(invoiceRes.data, plan);
			}
			// console.log('invoice Res', invoiceRes);
		},
		prefill: {
			name: user?.firstname + ' ' + user?.lastname || '',
			email: user?.email || '',
			contact: user?.phone || '',
		},
	};
	console.log('options ', options);
	const paymentObject = new window.Razorpay(options);
	paymentObject.open();
};

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}
