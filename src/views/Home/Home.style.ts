import { Col, Row } from 'antd';
import styled from 'styled-components';

export const MainContainer = styled.div`
	/* height: 100vh; */
`;
export const HeaderContainer = styled(Row)`
	height:5.4vh;
	border-bottom: 1px solid #e3ecf3;
`;
export const HeaderHome = styled(Col)`
	/* width: 4.16%; */
	border-right: 1px solid #e3ecf3;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const HeaderFileTab = styled(Col)`
	font-size: 20px;

	/* padding-left: 10px; */
	border-right: 1px solid #e3ecf3;
`;

export const RightIconGroup = styled(Col)`
	display: flex !important;
	justify-content: space-around;
	align-items: center;
`;
export const OwnerInfoContainer = styled(Col)`
	padding: 10px 20px;
	border-bottom: 1px solid #e3ecf3;
`;

export const RightHeaderContainer = styled(Row)`
	display: flex !important;
	height: 100%;
	justify-content: center;
	align-items: center;
`;
export const ExpandIconContainer = styled(Col)`
	margin-left: 6px;
`;
export const CenterColumn = styled(Col)`
	padding-top: 10px;
	border-right: 1px solid #e3ecf3;
	flex: 1;
`;

export const ContentSection = styled(Row)`
	height: calc(100vh - 100px);
	display: flex !important;
	justify-content: center;
	align-items: center;
`;
