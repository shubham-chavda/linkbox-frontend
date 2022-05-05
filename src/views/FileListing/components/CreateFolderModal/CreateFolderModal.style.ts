import { Input } from 'antd';
import styled  from 'styled-components';



export const MainContainer = styled.div`
display: none; /* Hidden by default */
position: absolute;
z-index: 1; /* Sit on top */

width: 100%; /* Full width */
height: 98%; /* Full height */
background-color: rgba(23, 9, 68, 0.06); /* Black w/ opacity */
`;

export const ModalDialog = styled.div`

  background-color: #fefefe;
  margin: auto;
  border-radius:12px;
  box-shadow:0 1px 4px rgba(0,0,0,0.2);
  width: 35%;

`;

export const InputStyled = styled(Input)`
	width: 95% !important;
	border-radius: 8px !important;
  background:gray;
	min-height: 38px;
  padding:10px;
  background:#F5F7F9;
  border:none;

  && .ant-input-affix-wrapper, input.ant-input{
      background:#F5F7F9;
      padding-left: 12px;
  }
  @media screen and (max-width: 1536px) {
		min-height: 38px;
	}
`;