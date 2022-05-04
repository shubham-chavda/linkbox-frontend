<<<<<<< HEAD
import { Button, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { DefaultPdf } from '../../../../assets';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { uploadDocument } from '../../../../store/Documents/DocumentsReducer';
import { UploadButtonsWrap } from '../../FileListing.style';
import {
	FileUploadContainer,
	FormField,
	DragDropText,
	UploadFileBtn
} from './FileUpload.styles';

type FileUploadTypes = {};
=======
import { Button, notification, Row, Upload } from "antd";
import React, { useRef, useState } from "react";
import { DefaultPdf } from "../../../../assets";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { uploadDocument } from "../../../../store/global/globalReducer";
import { UploadButtonsWrap } from "../../FileListing.style";
import { FileUploadContainer, SubTitleText, TitleText } from "./FileUpload.styles";

const { Dragger } = Upload;
const { DOC_URL } = process.env;

type FileUploadTypes = {
}

>>>>>>> 0a53b43fcd670299e557267bdefe8aaba3b13bbd
const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj: any) =>
	Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: any) =>
	Math.round(bytes / KILO_BYTES_PER_BYTE);

<<<<<<< HEAD
const FileUpload = ({}: FileUploadTypes) => {
	const dispatch = useAppDispatch();
	const fileInputField = useRef<any>(null);
	const [files, setFiles] = useState<any>({});
=======
const FileUpload = ({ }: FileUploadTypes) => {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem('token');

  const fileInputField = useRef<any>(null);
  const [files, setFiles] = useState<any>({});
>>>>>>> 0a53b43fcd670299e557267bdefe8aaba3b13bbd

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
		console.log(
			'🚀 ~ file: FileUpload.tsx ~ line 44 ~ callUpdateFilesCb ~ filesAsArray',
			filesAsArray
		);
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

<<<<<<< HEAD
	return (
		<>
			<FileUploadContainer>
				<Row style={{ flex: 1, justifyContent: 'center' }}>
					<div
						style={{
							width: '160px',
							alignSelf: 'center',
							marginTop: '100px',
							marginBottom: '100px'
						}}
					>
						<DefaultPdf
							stroke={'#ECF2F7'}
							width="138px"
							height="158px"
							color={'#C4CEDB'}
						/>
						<UploadButtonsWrap>
							<Button
								onClick={() => {}}
								className="color-sl"
								shape="round"
								style={{ marginLeft: '10px' }}
							>
								Copy from store
							</Button>
							<Button
								shape="round"
								type="primary"
								ref={fileInputField}
								onClick={handleUploadBtnClick}
								style={{ marginLeft: '10px' }}
							>
								Upload
							</Button>
						</UploadButtonsWrap>
					</div>
				</Row>
				<FormField
					type="file"
					ref={fileInputField}
					onChange={handleNewFileUpload}
					title=""
					value=""
				/>
			</FileUploadContainer>
		</>
	);
=======

  const onUploadDocument = {
    name: 'file',
    action: `${DOC_URL}document/create`,
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: token ? 'Bearer ' + token : '',
    },
    beforeUpload: (file: any) => {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        notification.error({
          message: `${file.name} is not a pdf file`
        })
      }
      return isPDF || Upload.LIST_IGNORE;
    },
    onChange(info: any) {
      console.log("info.file -------->", info);
      if (info.file.status === 'done') {
        notification.success({
          message: `${info.file.name} file uploaded successfully`
        })
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...onUploadDocument}>
      <FileUploadContainer>
        <Row style={{ flex: 1, justifyContent: "center" }}>
          <div
            style={{ width: '160px', alignSelf: "center", marginTop: "100px", marginBottom: "100px" }}
          >
            <DefaultPdf
              stroke={'#ECF2F7'}
              width="138px"
              height="158px"
              color={'#C4CEDB'}
            />
            <TitleText>Start uploading documents...</TitleText>
            <SubTitleText>
              Upload documents from your computer or copy from a store
            </SubTitleText>
            <UploadButtonsWrap>
              <Button
                onClick={() => { }}
                className="color-sl"
                shape="round"
                style={{ marginLeft: "10px" }}
              >
                Copy from store
              </Button>
              <Button
                shape="round"
                type='primary'
                ref={fileInputField}
                onClick={handleUploadBtnClick}
                style={{ marginLeft: "10px" }}
              >
                Upload
              </Button>
            </UploadButtonsWrap>
          </div>
        </Row>
        {/* <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
        /> */}
      </FileUploadContainer>
    </Dragger>
  );
>>>>>>> 0a53b43fcd670299e557267bdefe8aaba3b13bbd
};

export default FileUpload;
