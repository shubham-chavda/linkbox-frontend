/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, notification, Row, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { DefaultPdf } from '../../../../assets';
import Spinner from '../../../../components/Spinner/Spinner';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { uploadDocument } from '../../../../store/Documents/DocumentsReducer';
import { ButtonFilled } from '../../../../styles/Layout.style';
import { DraggerContainer } from './FileUpload.styles';

interface FileUploadTypes {
	isSearchDoc: boolean;
	isLoading: boolean;
}

// const KILO_BYTES_PER_BYTE = 1000;
// const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

// const convertNestedObjectToArray = (nestedObj: any) =>
// 	Object.keys(nestedObj).map((key) => nestedObj[key]);

// const convertBytesToKB = (bytes: any) =>
// 	Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = (props: FileUploadTypes) => {
	const { isSearchDoc, isLoading } = props;
	const dispatch = useAppDispatch();

	const fileInputField = useRef<any>(null);
	const [files, setFiles] = useState<any>({});

	const onUploadDocument = {
		customRequest: ({ file, onSuccess }: any) => {
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
		}
	};

	return isLoading ? (
		<Spinner />
	) : (
		<DraggerContainer
			{...onUploadDocument}
			multiple={false}
			showUploadList={false}
			accept=".pdf"
		>
			<div className="flex  justify-center">
				<div
					style={{ width: '50%' }}
					className="flex items-center flex-column color-sl-gray"
				>
					<DefaultPdf width="138px" height="158px" color={'#C4CEDB'} />
					<div className="bold mb1">
						{isSearchDoc
							? 'No document found... '
							: 'Start uploading documents...'}
					</div>
					{!isSearchDoc && (
						<>
							<div
								className="bold mb1 font-13 regular"
								style={{ width: '50%' }}
							>
								Upload documents from your computer or copy from a store
							</div>
							<div className="flex justify-center item-center">
								<Button
									className="color-sl ml1 border-light-gray"
									shape="round"
								>
									Copy from store
								</Button>
								<ButtonFilled
									className="ml1"
									ref={fileInputField}
									// onClick={() => handleNewFileUpload}
								>
									Upload
								</ButtonFilled>
							</div>
						</>
					)}
				</div>
			</div>
		</DraggerContainer>
	);
};
const mapStateToProps = (state: any) => ({
	isLoading: state.global.globalLoading
});
export default connect(mapStateToProps)(FileUpload);
