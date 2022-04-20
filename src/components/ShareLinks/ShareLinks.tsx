import { Avatar, Checkbox, Col, Row, Select } from 'antd';
import React from 'react';
import { InfoIcon, ShareLinkIcon } from '../../assets';
import {
	Content,
	GenreSelector,
	CopyButton,
	ShareCol
} from './ShareLinks.style';

const ShareLinks = () => {
	return (
		<>
			{/* style={{ display: 'flex ',justifyContent: 'space-between',alignItems: 'center'}} */}
			<Row>
				<Col span={24} className="flex items-center justify-between">
					<GenreSelector
						labelInValue
						bordered
						placeholder="Genre"
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="jack">Jack (100)</Select.Option>
						<Select.Option value="lucy">Lucy (101)</Select.Option>
					</GenreSelector>
					<GenreSelector
						labelInValue
						bordered
						placeholder="Privacy"
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="jack">Jack (100)</Select.Option>
						<Select.Option value="lucy">Lucy (101)</Select.Option>
					</GenreSelector>
					<img src={InfoIcon} alt="info" className="icon16" />
				</Col>
			</Row>

			<Row style={{ marginTop: '14px' }}>
				<ShareCol span={24} className="flex justify-between ">
					<Col className="p1">
						<img src={ShareLinkIcon} alt="share" className="icon22" />
						<span className="p1"> Get Sharable link</span>
					</Col>

					<CopyButton>copy</CopyButton>
				</ShareCol>
			</Row>
			<ShareCol
				span={24}
				className="flex justify-center my1 p1"
				style={{ color: '#686087', borderColor: '#686087' }}
			>
				Share with friends
			</ShareCol>
			<Checkbox
				style={{ color: '#686087' }}
				// onChange={onChange}
			>
				Notification
			</Checkbox>
		</>
	);
};
export default ShareLinks;
