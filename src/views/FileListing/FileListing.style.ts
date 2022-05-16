import { Input } from 'antd';
import styled from 'styled-components';

export const MemberCount = styled.div`
	font-weight: bold;
	width: 90%;
	color: #c4cedb;
`;
export const SearchButtonStyled = styled(Input)`
	border-radius: 24px;
	width: 180px;
	/* padding:10px; */
	background: #f5f7f9;
	border: none;
	height: 35px;
	&& .ant-input-affix-wrapper,
	input.ant-input {
		background: #f5f7f9;
		padding-left: 12px;
	}
`;
