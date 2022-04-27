import React, { useEffect } from 'react';
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
import history from '../../history';
function Login() {
	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			history.navigate?.('/');
		}
	}, []);
	return (
		<>
			<Container>
				<LeftCol span={10}>
					<LogoContainer className="pt1" justify="start">
						<p className="color-green">Link</p>
						<p>Box</p>
					</LogoContainer>
					<FormContainer>
						<SignInForm />
					</FormContainer>
				</LeftCol>
				<RightCol span={14}>
					<ImageContainer>
						<SignInSVG width="720px" height="720px" alt="" />
					</ImageContainer>
				</RightCol>
			</Container>
		</>
	);
}

export default Login;
