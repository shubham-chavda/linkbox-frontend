import { Upload } from "antd";
import styled from "styled-components";


export const StyledUpload = styled(Upload)`
    padding-left: 0 !important;
    && .ant-upload.ant-upload-select-picture-card, .ant-upload-list-picture-card-container
    {
        
        width: 40% ;
        height: 50px;
        padding:3px !important;
    }
   
    && .ant-upload-list-picture-card .ant-upload-list-item{
        padding:3px !important;
    }
`;