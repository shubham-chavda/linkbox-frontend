/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, notification, Row, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { DefaultPdf } from '../../../../assets';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { uploadDocument } from '../../../../store/Documents/DocumentsReducer';
import { ButtonFilled } from '../../../../styles/Layout.style';
import { DraggerContainer, FileUploadContainer } from './FileUpload.styles';

const { DOC_URL } = process.env;

type FileUploadTypes = {};

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj: any) =>
	Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: any) =>
	Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({}: FileUploadTypes) => {
	const dispatch = useAppDispatch();
	const token = window.localStorage.getItem('token');

	const fileInputField = useRef<any>(null);
	const [files, setFiles] = useState<any>({});

	const handleUploadBtnClick = () => {
		fileInputField.current.click();
	};

	const addNewFiles = (newFiles: any) => {
		for (const file of newFiles) {
			if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
				files[file.name] = file;
			}
		}
		return { ...files };
	};

	const callUpdateFilesCb = (files: any) => {
		const filesAsArray = convertNestedObjectToArray(files);

		const formData = new FormData();
		formData.append('name', filesAsArray[0].name);
		formData.append('docfile', filesAsArray[0]);
		dispatch(uploadDocument(formData));
	};

	const handleNewFileUpload = (e: any) => {
		const { files: newFiles } = e.target;
		if (newFiles.length) {
			const updatedFiles = addNewFiles(newFiles);
			setFiles(updatedFiles);
			callUpdateFilesCb(updatedFiles);
		}
	};

	const removeFile = (fileName: any) => {
		delete files[fileName];
		setFiles({ ...files });
		callUpdateFilesCb({ ...files });
	};

	const onUploadDocument = {
		name: 'file',
		action: `${DOC_URL}document/create`,
		headers: {
			'Content-Type': 'multipart/form-data',
			authorization: token ? 'Bearer ' + token : ''
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
			}
		},
		onDrop(e: any) {
			console.log('Dropped files', e.dataTransfer.files);
		}
	};

	return (
		<DraggerContainer {...onUploadDocument} multiple={true} accept=".pdf">
			<div className="flex  justify-center">
				<div
					className="flex items-center flex-column"
					style={{ color: '#AAAFB5', width: '50%' }}
				>
					<DefaultPdf width="138px" height="158px" color={'#C4CEDB'} />
					<div className="bold mb1">Start uploading documents...</div>
					<div className="bold mb1 font-13 regular" style={{ width: '50%' }}>
						Upload documents from your computer or copy from a store
					</div>
					<div className="flex justify-center item-center">
						<Button
							style={{ borderColor: '#686087' }}
							className="color-sl ml1"
							shape="round"
						>
							Copy from store
						</Button>
						<ButtonFilled
							className="ml1"
							ref={fileInputField}
							onClick={() => handleUploadBtnClick}
						>
							Upload
						</ButtonFilled>
					</div>
				</div>
			</div>
		</DraggerContainer>
	);
};

export default FileUpload;
