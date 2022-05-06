import React, { useEffect, useState } from 'react';
import { Avatar, Col, Row, Typography } from 'antd';

import { EditIcon } from '../../assets';
import { Title, Name, Tag } from './OwnerInfo.style';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
	getDocumentInfo,
	getDocumentList
} from '../../store/Documents/DocumentsReducer';

const { Paragraph } = Typography;

interface IOwnerInfo {
	fileListing: boolean;
	data?: any;
	ownerData?: {
		key?: string;
		name?: string;
		fileName?: string;
		description?: string;
		uuid: string;
	};
}
const OwnerInfo: React.FC<IOwnerInfo> = (props) => {
	const { fileListing, data } = props;
	console.log('🚀 ~ file: OwnerInfo.tsx ~ line 28 ~ data', data);

	// const dispatch = useAppDispatch();
	const selectedDocumentInfo = useAppSelector(
		(RootState) => RootState.documents.selectedDocumentInfo
	);

	const [editableStr, setEditableStr] = useState('This is an editable text.');

	return (
		<>
			<Row className="flex items-center">
				<Col span={17} className="flex items-center">
					<Avatar
						size={35}
						className="mr2"
						style={{ border: '1px solid gray' }}
						src={'https://joeschmoe.io/api/v1/random'}
					/>
					<Name>{'Robert__fox_'}</Name>
				</Col>

				<Col span={6}>
					{fileListing ? (
						<EditIcon alt="edit" />
					) : (
						<Tag className="font-12">Owner</Tag>
					)}
				</Col>
			</Row>
			<Row className="mt2">
				<Paragraph
					editable={{
						onChange: setEditableStr,
						icon: <EditIcon alt="edit" />,
						tooltip: 'click to edit text'
					}}
				>
					{data?.name || '---'}
				</Paragraph>
			</Row>
			<Row>
				<Paragraph className="font-12">
					{selectedDocumentInfo?.description ||
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
				</Paragraph>
			</Row>
		</>
	);
};
export default OwnerInfo;
