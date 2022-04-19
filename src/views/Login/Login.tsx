import React from 'react';
import {
	Container,
	FormContainer,
	ImageContainer,
	LeftCol,
	LogoContainer,
	RightCol
} from './Login.styles';
import SignInForm from './components/SignInForm';
import { SignInSVG } from '../../assets';
function Login() {
	return (
		<>
			<Container>
				<LeftCol span={10}>
					<LogoContainer justify="start">
						<p style={{ color: '#25CA69' }}>Link</p>
						<p>Box</p>
					</LogoContainer>
					<FormContainer>
						<SignInForm />
					</FormContainer>
				</LeftCol>
				<RightCol span={14}>
					<ImageContainer>
						{/* <SignInSVG /> */}
						<img src={SignInSVG} width="720px" height="720px" alt="" />
					</ImageContainer>
				</RightCol>
			</Container>
		</>
	);
}

export default Login;
