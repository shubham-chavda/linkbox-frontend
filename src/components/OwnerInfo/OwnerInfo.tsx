import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { EditIcon } from '../../assets';
import { Title, Name, Tag } from './OwnerInfo.style';

interface IOwnerInfo {
	fileListing: boolean;
}
const OwnerInfo: React.FC<IOwnerInfo> = (props) => {
	const { fileListing } = props;
	return (
		<>
			<Row>
				<Col span={17} className="flex items-center">
					<Avatar
						className="mr2"
						src={'https://joeschmoe.io/api/v1/random'}
						size={35}
						style={{ border: '1px solid gray' }}
					/>
					<Name>Robert__fox_</Name>
				</Col>

				<Col span={6} className="flex justify-center items-center">
					{fileListing ? (
						<img src={EditIcon} alt="edit" />
					) : (
						<Tag className="font-12">Owner</Tag>
					)}
				</Col>
			</Row>
			<Row className="mt2">
				<Title>Gmat Official Guide 2019</Title>
			</Row>
			<Row>
				<p className="font-12">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</Row>
		</>
	);
};
export default OwnerInfo;
