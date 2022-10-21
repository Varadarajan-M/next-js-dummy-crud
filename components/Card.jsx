import React from 'react';

const Card = ({ children, className, ...restProps }) => {
	const classNames = `card ${className}`;
	return (
		<div className={classNames} {...restProps}>
			{children}
		</div>
	);
};

export default Card;
