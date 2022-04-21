import { Col, Row } from 'antd';
import styled from 'styled-components';




export const ContentSection = styled(Row)`
	height: calc(100vh - 100px);
	display: flex !important;
	justify-content: center;
	align-items: center;
`;
export const RightCollapsibleSider = styled(Col)`
	transition: all 0.3s ease-in-out;
	width:320px;
`;