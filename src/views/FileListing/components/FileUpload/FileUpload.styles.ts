import { Upload } from "antd";
import styled from "styled-components";
const { Dragger } = Upload;
export const FileUploadContainer = styled.section`

  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;


export const DraggerContainer = styled(Dragger)`

  border:none !important;
  background:white !important;

`;