import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Row, Typography } from 'antd';

import { EditIcon } from '../../assets';
import { Name, Tag } from './OwnerInfo.style';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const { Paragraph } = Typography;

interface IOwnerInfo {
	fileListing: boolean;
	ownerData?: {
		key?: string;
		name?: string;
		fileName?: string;
		description?: string;
		uuid: string;
	};
}
const OwnerInfo: React.FC<IOwnerInfo> = (props) => {
	const { fileListing, ownerData } = props;

	const dispatch = useAppDispatch();
	const selectedDocumentInfo = useAppSelector(
		(RootState) => RootState.documents.selectedDocumentInfo
	);

	const [isEdit, setIsEdit] = useState(false);
	const [titleText, setTitleText] = useState(selectedDocumentInfo?.name);

	useEffect(() => {
		setTitleText(selectedDocumentInfo?.name);
	}, [])
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
						<Button
							type={'link'}
							onClick={() => setIsEdit(!isEdit)}
							icon={
								<EditIcon
									alt="edit"
									color={isEdit ? "#25CA69" : "#170944"}
									stroke={isEdit ? "#25CA69" : "#170944"}
								/>}
						/>
					) : (
						<Tag className="font-12">Owner</Tag>
					)}
				</Col>
			</Row>
			<Row className="mt2">
				<Paragraph
					editable={{
						onChange: setTitleText,
						icon: <EditIcon alt="edit" />,
					}}
				>
					{selectedDocumentInfo?.name || '---'}
				</Paragraph>
			</Row>
			<Row>
				<Paragraph className="font-12" editable={isEdit}>
					{selectedDocumentInfo?.description ||
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
				</Paragraph>
			</Row>
		</>
	);
};
export default OwnerInfo;
