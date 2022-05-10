import { Input, Row, Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

export const ToolBarContainer = styled(Row)`
	width: 100%;
	padding: 10px 18px;

	margin-top: 0px;
`;

export const SearchButton = styled(Input)`
	border-radius: 24px;
	width: 180px;
	padding: 10px;
	background: #f5f7f9;
	border: none;
	&& .ant-input-affix-wrapper,
	input.ant-input {
		background: #f5f7f9;
		padding-left: 12px;
	}
`;

export const IncDecContainer = styled.div`
	border-radius: 24px;
	border: 1px solid #f2f2f2;
	padding: 5px;
	width: 130px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SelectContainer = styled(Select)`
	width: 80px;
	font-size: 14px;
	border: none;
	text-align: center;
	height: 1.5rem;
`;
export const PaginationContainer = styled.div`
	border: 1px solid #f2f2f2;
	border-radius: 12px;
	padding: 10px;
	width: 130px;
`;
export const IconBG = styled.div`
	background: #170944;
	padding: 10px;
	border-radius: 12px;
`;
