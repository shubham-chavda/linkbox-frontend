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
	padding-Top:20px;
`;

export const HeaderFileTab = styled(Col)`
	font-size: 20px;
    height: 100%;
	border-right: 1px solid #e3ecf3;
`;

export const CenterColumn = styled(Col)`
	padding-top: 10px;
	border-right: 1px solid #e3ecf3;
	flex: 1;
`;