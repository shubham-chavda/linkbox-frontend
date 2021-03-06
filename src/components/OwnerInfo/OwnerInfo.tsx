import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Row } from 'antd';

import { EditIcon } from '../../assets';
import { DescriptionBox, InputBox, Name, Tag } from './OwnerInfo.style';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { updateDocumentInfo } from '../../store/Documents/DocumentsReducer';
import { connect } from 'react-redux';
import nameInitials from 'name-initials';
interface IOwnerInfo {
	fileListing: boolean;
	ownerData?: any;
	user:any

}
const OwnerInfo: React.FC<IOwnerInfo> = (props) => {
	const { fileListing,user } = props;

	const dispatch = useAppDispatch();
	const selectedDocumentInfo = useAppSelector((RootState) => RootState.documents.selectedDocumentInfo);
	const [isEdit, setIsEdit] = useState(false);
	const [titleText, setTitleText] = useState('');
	const [titleTextCopy, setTitleTextCopy] = useState('');
	const [descriptionText, setDescriptionText] = useState('');
	useEffect(() => {
		console.log('selectedDocumentInfo- ------>', selectedDocumentInfo,props.ownerData);
		setTitleText(selectedDocumentInfo?.name);
		setDescriptionText(selectedDocumentInfo?.desc);
	}, [selectedDocumentInfo]);

	useEffect(() => {updateDocument()},[isEdit]);
	// useEffect(()=>{
	// 	if(props.docname){
	// 		setTitleTextCopy(props.docname)	
	// 	}
	// },[props.docname])

	const updateDocument = () => {
		if (!isEdit && titleText && descriptionText) {
			var payload = {
				name: titleText,
				desc: descriptionText,
				isShareable: true,
				sendNotification: true,
				uuid: selectedDocumentInfo?.uuid
			}
			// setTitleTextCopy(payload.name)
			dispatch(updateDocumentInfo(payload));
			console.log('payload--Ownerpage', payload)}};

	return (
		<>
			<Row className="flex items-center ">
				<Col span={18} className="flex items-center fluid">
					<Avatar
						style={{ backgroundColor: '#25CA69' }}
						// src="https://joeschmoe.io/api/v1/random"
						alt="Name"
						size={35}
						className="mr2"
					>
						{nameInitials(user?.fullName || '-')}
					</Avatar>
					<Name>{user?.fullName || '-'}</Name>
				</Col>

				<Col span={5}>
					{fileListing ? (
						<Button
							type={'link'}
							onClick={() => {
								console.log('titleTextCopy',titleTextCopy,'titleText',titleText)
								
								setIsEdit(!isEdit)}
							}
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
				<Row className="mt2">
					<InputBox
						style={{ width: '95%' }}
						bordered={false}
						readOnly={!isEdit}
						value={titleText}
						className="font-12 hide-scrollbar mb1"
						onChange={(e) => 
							setTitleText(e.target.value)
							 }
						placeholder="Write Title"
					/>			
				</Row>
				<Row>
					<DescriptionBox
						bordered={false}
						readOnly={!isEdit}
						rows={2}
						className="font-12 hide-scrollbar"
						style={{ resize: 'none', width: '100%' }}
						placeholder="Write Description"
						value={descriptionText}
						onChange={(e) => setDescriptionText(e.target.value)}
					/>
				</Row>
			</Row>
		</>
	);
	
};
const mapStateToProps = (state: any) => ({
	user: state.global.user
});
export default connect(mapStateToProps)(OwnerInfo);

