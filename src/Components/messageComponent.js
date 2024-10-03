import React, { useState } from 'react';

const MessageCell = ({ message }) => {
	const [hover, setHover] = useState(false);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
        alignItems:'center'
			}}
			onMouseOver={() => setHover(true)}
			onMouseOut={() => setHover(false)}
		>
			{hover ? message : message.slice(0, 12)}
			{message.length > 12 && hover === false ? '...' : ''}
		</div>
	);
};

export default MessageCell;
