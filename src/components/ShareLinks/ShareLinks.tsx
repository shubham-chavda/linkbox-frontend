import { Avatar, Col, Row, Select } from 'antd';
import React from 'react';
import { InfoIcon, ShareLinkIcon } from '../../assets';
import { Content, Title, GenreSelector, ShareDiv } from './ShareLinks.style';

const ShareLinks = () => {
	return (
		<>
			{/* style={{ display: 'flex ',justifyContent: 'space-between',alignItems: 'center'}} */}
			<Row>
				<Col span={24} className="flex items-center justify-around">
					<GenreSelector
						labelInValue
						bordered
						placeholder="Genre"
						style={{ width: 120, borderRadius: '24px ' }}
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="jack">Jack (100)</Select.Option>
						<Select.Option value="lucy">Lucy (101)</Select.Option>
					</GenreSelector>
					<GenreSelector
						labelInValue
						bordered
						placeholder="Genre"
						style={{ width: 120, borderRadius: '24px ' }}
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="jack">Jack (100)</Select.Option>
						<Select.Option value="lucy">Lucy (101)</Select.Option>
					</GenreSelector>
					<img src={InfoIcon} alt="chat" className="icon16" />
				</Col>
			</Row>
			<Row style={{ marginTop: '20px' }}>
				<ShareDiv>
					<img src={ShareLinkIcon} alt="chat" className="icon22" />
					Get Sharable link
				</ShareDiv>
			</Row>
			<Row>
				<Content>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Content>
			</Row>
		</>
	);
};
export default ShareLinks;
