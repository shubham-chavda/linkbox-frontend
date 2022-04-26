import React, { useEffect } from 'react';
import { Form, Checkbox, Row, Col, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { FacebookIcon, LinkedInIcon } from '../../../assets';
import {
	MainContainer,
	HeaderText,
	SubText,
	InputField,
	PasswordField,
	SignInButton,
	SignInOptions
} from './SignInForm.style';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logInUser } from '../../../store/global/globalReducer';
import history from '../../../history';

const SignInForm = () => {
	const dispatch = useAppDispatch();
	const onFinish = ({
		email,
		password
	}: {
		email: string;
		password: string;
	}) => {
		dispatch(logInUser({ email: email, password: password }));
	};
	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			history.navigate?.('/');
		}
	}, []);

	return (
		<MainContainer>
			<div>
				<HeaderText>{"Let's sign In"}</HeaderText>
				<SubText>
					{"Don't have an account? "}
					<a>sign up</a>
				</SubText>
			</div>

			<Form
				layout="vertical"
				name="signin"
				onFinish={onFinish}
				scrollToFirstError
				requiredMark={false}
			>
				<Form.Item
					label="E-mail / Login"
					name="email"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!'
						},
						{
							required: true,
							message: 'Please input your E-mail!'
						}
					]}
				>
					<InputField placeholder="name@company.com" />
				</Form.Item>

				<Row style={{ width: '80%' }} justify="space-between">
					<Col span={6}> Password</Col>
					<Col span={16} className="right-align">
						<a>Forgot Your Password?</a>
					</Col>
				</Row>

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						},
						{ type: 'string', min: 6 }
					]}
					// hasFeedback
				>
					<PasswordField className="textFields" placeholder="*********" />
				</Form.Item>

				<Form.Item name="remember" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
				<Form.Item
				// {...tailFormItemLayout}
				>
					<SignInButton type="submit"> Sign In </SignInButton>
				</Form.Item>
			</Form>
			<Divider className="font-12" style={{ color: '#C5C9CE', height: '10px' }}>
				OR
			</Divider>
			<Row>
				<SignInOptions span={13}>
					<GoogleOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
					<span style={{ fontSize: '14px' }}>Sign in with Google</span>
				</SignInOptions>
				<SignInOptions span={3}>
					{/* <FacebookIcon /> */}
					<img src={FacebookIcon} className="icon25" alt="Facebook" />
				</SignInOptions>
				<SignInOptions span={3}>
					{/* <LinkedInIcon /> */}
					<img src={LinkedInIcon} className="icon22" alt="linkedIn" />
				</SignInOptions>
			</Row>
		</MainContainer>
	);
};

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

export default SignInForm;
