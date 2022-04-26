import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { EditIcon } from '../../assets';
import { Title, Name, Tag } from './OwnerInfo.style';

interface IOwnerInfo {
	fileListing: boolean;
	ownerData?: {
		key?: string;
		name?: string;
		fileName?: string;
		description?: string;
	};
}
const OwnerInfo: React.FC<IOwnerInfo> = (props) => {
	const { fileListing, ownerData } = props;
	console.log('🚀 ~ file: OwnerInfo.tsx ~ line 12 ~ ownerData', ownerData);
	return (
		<>
			<Row className="flex items-center">
				<Col span={17} className="flex items-center">
					<Avatar
						className="mr2"
						src={'https://joeschmoe.io/api/v1/random'}
						size={35}
						style={{ border: '1px solid gray' }}
					/>
					<Name>{ownerData?.name || 'Robert__fox_'}</Name>
				</Col>

				<Col span={6}>
					{fileListing ? (
						<img src={EditIcon} alt="edit" />
					) : (
						<Tag className="font-12">Owner</Tag>
					)}
				</Col>
			</Row>
			<Row className="mt2">
				<Title>{ownerData?.fileName || 'Gmat Official Guide 2019'}</Title>
			</Row>
			<Row>
				<p className="font-12">
					{ownerData?.description ||
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
				</p>
			</Row>
		</>
	);
};
export default OwnerInfo;
