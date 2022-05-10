import { Button, Checkbox, Col, message, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { InfoIcon, ShareLinkIcon } from '../../assets';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateDocumentInfo } from '../../store/Documents/DocumentsReducer';
import { ButtonFilled } from '../../styles/Layout.style';
import { GenreSelector, ShareCol } from './ShareLinks.style';

interface IShareLinks {
	selectedDocumentInfo: any;
}
const ShareLinks = (props: IShareLinks) => {
	const dispatch = useAppDispatch();
	const { selectedDocumentInfo } = props;
	const [isShareable, setIsShareable] = React.useState(false);
	const [isSendNotification, setIsSendNotification] = React.useState(false);
	useEffect(() => {
		setIsShareable(selectedDocumentInfo?.isShareable);
		setIsSendNotification(selectedDocumentInfo?.sendNotification);
	}, [selectedDocumentInfo]);

	const copyLink = () => {
		if (selectedDocumentInfo?.isShareable) {
			navigator.clipboard.writeText(
				`${window.location.origin}/document-detail/${selectedDocumentInfo.uuid}`
			);
			message.success('Document link Copied 🎉');
		} else message.info('Document is not Shareable');
	};
	const setCheckState = (e: any) => {
		console.log('🚀 ~ file: ShareLinks.tsx ~ line 36 ~ setCheckState ~ e', e);
		const idsArray = e.target.id.split(/(\s+)/);
		eval(idsArray[0])(e.target.checked);
		updateDocument(idsArray[2], e.target.checked);
	};
	const updateDocument = (key: string, value: boolean) => {
		const checkedPayload = {
			isShareable: key === 'isShareable' ? value : isShareable,
			sendNotification: key === 'sendNotification' ? value : isSendNotification
		};
		const payload = {
			...checkedPayload,
			name: selectedDocumentInfo.name,
			desc: selectedDocumentInfo.desc || '',
			uuid: selectedDocumentInfo.uuid
		};

		dispatch(updateDocumentInfo(payload));
	};
	return (
		<>
			<Row>
				<Col span={24} className="flex items-center justify-between">
					<GenreSelector
						labelInValue
						bordered
						placeholder="Genre"
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="General">General (100)</Select.Option>
						<Select.Option value="Confidential">
							Confidential (101)
						</Select.Option>
					</GenreSelector>
					<GenreSelector
						labelInValue
						bordered
						placeholder="Privacy"
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="Medium">Medium</Select.Option>
						<Select.Option value="High">High</Select.Option>
					</GenreSelector>
					<InfoIcon alt="info" className="icon16" />
				</Col>
			</Row>

			<Row
				className="mt2"
				style={{
					cursor: selectedDocumentInfo?.isShareable ? 'pointer' : 'not-allowed'
				}}
			>
				<ShareCol
					span={24}
					className="flex justify-between "
					onClick={() => copyLink()}
					aria-disabled={!selectedDocumentInfo?.isShareable}
				>
					<Col className="p1 flex items-center">
						<ShareLinkIcon alt="share" className="icon22" />
						<span className="p1 font-13">Get Sharable link</span>
					</Col>

					<ButtonFilled>copy</ButtonFilled>
				</ShareCol>
			</Row>

			<Col span={24} className="flex justify-center flex-column  my1 ">
				<Checkbox
					id="setIsShareable isShareable"
					checked={isShareable}
					className="p1 font-12 color-light-gray"
					onChange={setCheckState}
				>
					Deactivate Shareable link
				</Checkbox>
				<Button
					className="color-light-gray border-light-gray mt1"
					shape="round"
					style={{ width: '100%' }}
					type="ghost"
					onClick={() => copyLink()}
				>
					Share with friends
				</Button>
			</Col>
			<Checkbox
				id="setIsSendNotification sendNotification"
				checked={isSendNotification}
				className="pt1 pl1 font-12 color-light-gray mt1"
				onChange={setCheckState}
			>
				Notification
			</Checkbox>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	selectedDocumentInfo: state.documents.selectedDocumentInfo
});
export default connect(mapStateToProps)(ShareLinks);
