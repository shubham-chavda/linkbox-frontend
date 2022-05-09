import React from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import { Button, notification, Upload } from 'antd';

import { UploadIcon } from '../../../../assets';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { uploadDocument } from '../../../../store/Documents/DocumentsReducer';
import { MainContainer, ModalDialog } from './UploadFileModal.style';

const UploadFileModal = (props: any) => {
	const { isOpen, closeModal } = props;
	const dispatch = useAppDispatch();

	const onUploadDocument = {
		customRequest: ({ file, onSuccess }: any) => {
			console.log('file ------->', file);
			const formData = new FormData();
			formData.append('name', file.name);
			formData.append('docfile', file);
			dispatch(uploadDocument(formData));
		},
		beforeUpload: (file: any) => {
			const isPDF = file.type === 'application/pdf';
			if (!isPDF) {
				notification.error({
					message: `${file.name} is not a pdf file`
				});
			}
			return isPDF || Upload.LIST_IGNORE;
		},
		onChange(info: any) {
			console.log('info.file -------->', info);
			if (info.file.status === 'done') {
				notification.success({
					message: `${info.file.name} file uploaded successfully`
				});
			} else if (info.file.status === 'error') {
				notification.error({
					message: `${info.file.response.message || '--'} failed to upload file.`
				});
			}
		}
	};
	return (
		<MainContainer
			onClick={() => closeModal()}
			className="justify-center items-center"
			style={{ display: isOpen ? 'flex' : 'none' }}
		>
			<ModalDialog className="p2 m2" onClick={(e: any) => { e.stopPropagation(); }}>
				<div className="m1 p1 ">
					<div className="center font-14 mt2 bold" style={{ color: '#9F9AB2' }}>
						Upload Files
					</div>
					<div className="mt3 mx3 mb2">
						<Dragger {...onUploadDocument} multiple={true} accept=".pdf" showUploadList={false}>
							<div className="flex items-center flex-column">
								<div className="mb1">
									<UploadIcon />
								</div>
								<div className="bold mb1 font-13 regular color-sl-gray">
									Drag & Drop your file(s) here or
								</div>
								<div className="flex justify-center item-center">
									<Button
										className="color-light-gray ml1 font-13 border-light-gray"
										shape="round"
									>
										Browse files
									</Button>
								</div>
							</div>
						</Dragger>
					</div>
				</div>
			</ModalDialog>
		</MainContainer>
	);
};

export default UploadFileModal;
