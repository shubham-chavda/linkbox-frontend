import { Select } from "antd";
import styled from "styled-components";

export const Content = styled.p`
    font-size: 12px;
`;

export const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
`;

export const GenreSelector = styled(Select)`

    &&  .ant-select-selector{
        border-radius:12px !important;
    }
`
export const ShareDiv = styled.div`
    border:1px solid #F2F2F2;
    border-radius: 24px;
`
