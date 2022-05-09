import { Input } from 'antd';
import styled from 'styled-components';

export const MemberCount = styled.div`
	font-weight: bold;
	width:90%;
    color:#C4CEDB;
`;
export const SearchButtonStyled = styled(Input)`
    border-radius:24px;
    width: 180px;
    /* padding:10px; */
    background:#F5F7F9;
    border:none;
    && .ant-input-affix-wrapper, input.ant-input{
        background:#F5F7F9;
        padding-left: 12px;
    }
   
`;

