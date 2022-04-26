import { Input, Row, Select } from 'antd';
import styled from 'styled-components';

export const ToolBarContainer = styled(Row)`
  width:100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 18px;
`;


export const SearchButton = styled(Input)`
  border-radius:24px;
  width: 180px;
  padding:10px;
  background:#F5F7F9;
  border:none;
  && .ant-input-affix-wrapper, input.ant-input{
    background:#F5F7F9;
    padding-left: 12px;
  }  
`;

export const IncDecContainer = styled.div`
  border: 1px solid #F2F2F2;
  border-radius: 24px;
  padding: 5px;
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectContainer = styled(Select)`
  width: 75px;
  font-size: 14px;
  border: none;
  text-align: center;
  height: 1.5rem;
`;