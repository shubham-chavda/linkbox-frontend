import { Col, Row } from 'antd';
import styled from 'styled-components';


export const WebviewerSection = styled.div`
	flex: 1;
	margin: 8px;
	height: 100%;
  -webkit-box-shadow: 1px 1px 10px #999;
  box-shadow: 1px 1px 10px #999;
`;

export const ContentSection = styled(Row)`
	height: calc(100vh - 100px);
	display: flex !important;
	justify-content: center;
	align-items: center;
`;
export const RightCollapsibleSider = styled(Col)`
	transition: all 0.3s ease-in-out;
	width:20.8%;
`;
export const MemberCount = styled.div`
	font-weight: bold;
    color:#C4CEDB;
    font-size: 12px;
`;