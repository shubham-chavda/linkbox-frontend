import { Col, Row, Input } from 'antd';
import styled from 'styled-components';

export const MainConteiner = styled.div`
	padding: 10px;
`;
export const MenuItems = styled.div`
display:flex
flex-direction:coloumn
`;
export const MenuText = styled.p`
	font-size: 10;
	padding-top: 5px;
	padding-bottom: 5px;
	text-align: left;
	margin-left: 2px;
`;
export const EmailInput = styled(Input)`
	background: #f5f7f9;
	height: 30px;
	width: 229px;
	border-radius: 5px;
`;
export const EmailText = styled.p`
	font-family: Poppins;
	font-size: 14px;
	font-weight: 400;
	line-height: 22px;
	letter-spacing: 0px;
	text-align: left;
`;
export const DateText = styled(EmailText)`
	margin-top: 13px;
`;
export const AutoSaveTitle = styled.p`
	font-size: 10;
	color: #25ca69;
`;
export const AutoSaveRow = styled(Row)`
	margin-top: 13px;
	font-size: 10;
	color: #25ca69;
`;

export const UserProfile = styled.div`
	height: 100px;
	width: 100px;
	left: -10.41796875px;
	top: 2.08447265625px;
	border-radius: 50px;
	background-color: black;
`;

export const ProfileTitle = styled.text`
	font-size: 15px;
	font-weight: bold;
	color: black;
`;
export const IntLevelText = styled.p`
	font-size: 12px;
	font-weight: light;
	color: #9f9ab2;
`;
export const FriendsDiv = styled.div`
	font-size: 12px;
	font-weight: light;
	border-color: black;
	border: thin;
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	border: 1px solid #ecf2f7;
	text-align: center;
	padding: 7px;
`;
export const ReqDiv = styled(FriendsDiv)`
	border-bottom-left-radius: 0px;
	border-top-left-radius: 0px;
	border-bottom-right-radius: 10px;
	border-top-right-radius: 10px;
`;
export const FrndText = styled.p`
	font-size: 13px;
	color: black;
`;
export const SubjectDiv = styled(FriendsDiv)`
	border-radius: 30px;
`;
export const SocialDiv = styled.div`
	border-radius: 30px;
	border: 1px solid #ecf2f7;
	width: 40px;
	height: 40px;
`;
export const ResetButton = styled.button`
	border-radius: 30px;
	background-color: #170944;
	color: white;
	font-weight: lightet;
	font-size: 10px;
	padding: 10px;
	margin-top: 7%;
`;
export const SocialImportDiv = styled.div`
	border-radius: 10px;
	border: 1px solid #686087;
	padding: 5px;
	justify-content: flex-start;
	width: 100%;
	display: flex;
	flex-direction: coloumn;
	margin-top: 15px;
`;
export const Divide = styled.div`
	border: 0.1px solid #ecf2f7;
	width: 100%;
	margin-bottom: 15px;
`;
