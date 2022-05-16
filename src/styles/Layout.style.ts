import { Col, Input, Row, Select } from 'antd';
import styled from 'styled-components';

export const MainContainer = styled.div`
	/* height: 100vh; */
`;
export const HeaderContainer = styled(Row)`
	height: 5.9vh;
	border-bottom: 1px solid #e3ecf3;
`;
export const HeaderHome = styled(Col)`
	/* width: 4.16%; */

	border-right: 1px solid #e3ecf3;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const OwnerInfoContainer = styled(Col)`
	padding: 10px 20px;
	border-bottom: 1px solid #e3ecf3;
	transition: all 0.5s ease-in-out;
`;

export const RightHeaderContainer = styled(Row)`
	display: flex !important;
	height: 100%;
	justify-content: center;
	align-items: center;
`;
export const RightIconGroup = styled(Col)`
	display: flex !important;
	justify-content: space-around;
	align-items: center;
`;

export const LeftIconGroup = styled(Col)`
	margin-left: 6px;
`;
export const LeftSliderContainer = styled(Col)`
	padding-top: 20px;
`;

export const HeaderFileTab = styled(Col)`
	margin-top: 10.5px;
	font-size: 20px;
	height: 100%;
	// border-right: 1px solid #e3ecf3;
`;

export const CenterColumn = styled(Col)`
	padding-top: 10px;
	margin-top: 0px;
	border-right: 1px solid #e3ecf3;
	flex: 1;
`;

export const SearchButtonFilled = styled(Input)`
	border-radius: 24px;
	padding: 10px;
	background: #f5f7f9;
	border: none;
	&& .ant-input-affix-wrapper,
	input.ant-input {
		background: #f5f7f9;
		padding-left: 12px;
	}
`;
export const SearchButtonDropDown = styled(Select)`
	border-radius: 24px;
	width: 180px;
	padding: 10px;
	background: #f5f7f9;
	border: none;
	&& .ant-select-selector {
		background: #f5f7f9 !important;
		padding-left: 12px;
	}
	&& .ant-select-selector:hover {
		border-color: none !important;
	}
`;
export const ButtonFilled = styled.button`
	border: none;
	background: #170944;
	border-radius: 24px;
	color: white;
	width: 80px;
`;
