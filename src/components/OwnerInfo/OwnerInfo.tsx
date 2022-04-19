import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { Content, Title, Name, Tag } from './OwnerInfo.style';

const OwnerInfo = () => {
	return (
		<>
			{/* style={{ display: 'flex ',justifyContent: 'space-between',alignItems: 'center'}} */}
			<Row>
				<Col span={17} style={{ display: 'flex ', alignItems: 'center' }}>
					<Avatar
						src={'https://joeschmoe.io/api/v1/random'}
						size={35}
						style={{ border: '1px solid gray', marginRight: '16px' }}
					/>
					<Name>Robert__fox_</Name>
				</Col>

				<Col
					span={6}
					style={{
						display: 'flex ',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Tag>Owner</Tag>
				</Col>
			</Row>
			<Row style={{ marginTop: '20px' }}>
				<Title>Gmat Official Guide 2019</Title>
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
export default OwnerInfo;
