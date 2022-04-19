import { Spin } from 'antd';
import React from 'react';
import style from './Spinner.module.less';
const Spinner = () => {
	return (
		<div className={style.spinner}>
			<Spin />
		</div>
	);
};

export default Spinner;
