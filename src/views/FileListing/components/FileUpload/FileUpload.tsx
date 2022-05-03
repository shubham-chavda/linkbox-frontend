import { Button, Row } from "antd";
import React, { useRef, useState } from "react";
import { DefaultPdf } from "../../../../assets";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { uploadDocument } from "../../../../store/global/globalReducer";
import { UploadButtonsWrap } from "../../FileListing.style";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
} from "./FileUpload.styles";


type FileUploadTypes = {
}
const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj: any) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: any) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({ }: FileUploadTypes) => {
  const dispatch = useAppDispatch();
  const fileInputField = useRef<any>(null);
  const [files, setFiles] = useState<any>({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles: any) => {
    for (let file of newFiles) {
      if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files: any) => {
    const filesAsArray = convertNestedObjectToArray(files);
    console.log("filesAsArray -------->", filesAsArray);
    dispatch(uploadDocument({
      name: filesAsArray[0].name,
      docfile: filesAsArray[0]
    }));
  };

  const handleNewFileUpload = (e: any) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName: any) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
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
};

export default FileUpload;
