import { Button } from '@mui/material';
import React from 'react';
import './style.scss';

const CustomButton = (props) => {
	const { className = '', type, title = '', onClick, ...extraProps } = props;

	const customProp = {
		onClick,
		title,
		...extraProps,
	};

	if (type === 'delete') {
		customProp.className = 'btn-danger';
		customProp.title = title === '' ? 'Delete' : title;
	}

	if (type === 'confirm') {
		customProp.className = 'btn-primary';
		customProp.title = title === '' ? 'Confirm' : title;
	}

	return (
		<Button
			{...customProp}
			className={`custom-button ${customProp.className} ${className}`}
		>
			{customProp.title}
		</Button>
	);
};

CustomButton.propTypes = {};

export default CustomButton;
