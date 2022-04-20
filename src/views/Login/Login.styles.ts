import { Col, Row } from "antd";

import styled from "styled-components";


export const Container = styled(Row)`
	margin: auto;
	min-height: 85vh;
	max-height:100vh;
	height: 100vh;
	display: flex !important;
	justify-content: space-between;
	box-sizing: border-box;

	@media screen and (max-width: 1536px) {
		/* padding-top: 18px; */
		/* padding-bottom: 18px; */
	  }

	@media screen and (max-width: 1280px) {
		/* padding-top: 18px;
		padding-bottom: 18px; */
		min-height: 90vh;
		justify-content: center;
	  }
	  @media screen and (max-width: 768px) {
		/* padding-top: 18px;
		padding-bottom: 18px; */
		min-height: 90vh;
		justify-content: center;
	  }
	
`;

export const LeftCol = styled(Col)`
	display: flex !important;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 420px;
	/* margin-top:20px;	 */
`;
export const LogoContainer = styled(Row)`
	width:60%;
	font-weight:bolder;
	font-size:1.6rem;
`;
export const FormContainer = styled.div`
	display: flex !important;
	height: 80vh;
	width: 60%;
	@media screen and (max-width: 1536px) {
		/* padding-top: 24px; */
	  }

`;
export const RightCol = styled(Col)`
	display: flex !important;
    justify-content: center;
	align-items: center;
	background:#ECF4FF;
	/* @media screen and (max-width: 1280px) {
		width: 0%;
		display: none;
	  }
	@media screen and (max-width: 768px) {
		width: 0%;
		display: none;
	  } */
	  @media screen and (max-width: 1021px) {
		width: 0%;
		display: none !important;
	  }
`;
export const ImageContainer = styled.div`
	margin: auto;
	max-height: 100vh;
	max-width: 100vh;

`;