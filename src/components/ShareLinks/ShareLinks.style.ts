import { Col, Select } from "antd";
import styled from "styled-components";

export const Content = styled.p`
    font-size: 12px;
`;


export const GenreSelector = styled(Select)`
    width: 110px;
    &&  .ant-select-selector{
        border-radius:12px !important;
    }
`
export const ShareCol = styled(Col)`
    border:1px solid #F2F2F2;
    border-radius: 24px;
`
export const CopyButton = styled.button`
    border:none;
    background: #170944;
    border-radius: 24px;
    color: white;
    width:80px;
`;
