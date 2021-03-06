import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Row, Typography } from 'antd';

import { EditIcon } from '../../assets';
import { Name, Tag } from './OwnerInfo.style';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { updateDocumentInfo } from '../../store/Documents/DocumentsReducer';

const { Paragraph } = Typography;

interface IOwnerInfo {
	fileListing: boolean;
	ownerData?: any;
}
const OwnerInfo: React.FC<IOwnerInfo> = (props) => {
	const { fileListing } = props;

	const dispatch = useAppDispatch();
	const selectedDocumentInfo = useAppSelector(
		(RootState) => RootState.documents.selectedDocumentInfo
	);

	const [isEdit, setIsEdit] = useState(false);
	const [titleText, setTitleText] = useState('');
	const [descriptionText, setDescriptionText] = useState('');

	useEffect(() => {
		console.log('selectedDocumentInfo- ------>', selectedDocumentInfo);
		setTitleText(selectedDocumentInfo?.name);
		setDescriptionText(selectedDocumentInfo?.desc);
	}, [selectedDocumentInfo]);

	useEffect(() => {
		updateDocument();
	}, [isEdit]);

	const updateDocument = () => {
		console.log(
			'---------------------',
			!isEdit &&
				(titleText !== selectedDocumentInfo?.name ||
					descriptionText !== selectedDocumentInfo?.desc)
		);
		console.log(
			'---------------------',
			!isEdit,
			titleText,
			selectedDocumentInfo,
			descriptionText
		);

		if (
			!isEdit &&
			titleText &&
			descriptionText !== selectedDocumentInfo?.desc
		) {
			const payload = {
				name: titleText,
				desc: descriptionText,
				isShareable: true,
				sendNotification: true,
				uuid: selectedDocumentInfo?.uuid
			};
			dispatch(updateDocumentInfo(payload));
		}
	};

	console.log('titleText -------->', titleText);

	return (
		<>
			<Row className="flex items-center ">
				<Col span={17} className="flex items-center fluid">
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
									color={isEdit ? '#25CA69' : '#170944'}
									stroke={isEdit ? '#25CA69' : '#170944'}
								/>
							}
						/>
					) : (
						<Tag className="font-12">Owner</Tag>
					)}
				</Col>
			</Row>
			<Row className="mt2">
				<Paragraph
					editable={{
						editing: isEdit,
						onChange: setTitleText,
						icon: null
					}}
				>
					{titleText || '-----'}
				</Paragraph>
			</Row>
			<Row>
				<Paragraph
					className="font-12"
					editable={{
						icon: null,
						editing: isEdit,
						onChange: setDescriptionText
					}}
				>
					{descriptionText || '-----'}
				</Paragraph>
			</Row>
		</>
	);
};
export default OwnerInfo;
