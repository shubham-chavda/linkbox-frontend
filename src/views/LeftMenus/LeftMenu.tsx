import React, { useState } from 'react';

import moment from 'moment';
import {
	Col,
	Row,
	DatePicker,
	TimePicker,
	Select,
	Space,
	Avatar,
	Input,
	Divider,
	Checkbox
} from 'antd';

import {
	CheckCircleOutlined,
	LinkedinOutlined,
	GoogleOutlined,
	FacebookOutlined,
	MailOutlined,
	createFromIconfontCN,
	UserOutlined,
	SettingOutlined,
	CustomerServiceOutlined,
	LogoutOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone
} from '@ant-design/icons';
import {
	MainConteiner,
	MenuItems,
	MenuText,
	EmailText,
	EmailInput,
	DateText,
	AutoSaveTitle,
	AutoSaveRow,
	UserProfile,
	ProfileTitle,
	IntLevelText,
	FriendsDiv,
	ReqDiv,
	FrndText,
	SubjectDiv,
	SocialDiv,
	ResetButton,
	SocialImportDiv,
	Divide
} from './LeftMenu.style';
import {
	CenterColumn,
	HeaderContainer,
	HeaderFileTab,
	HeaderHome,
	LeftIconGroup,
	LeftSliderContainer,
	MainContainer,
	OwnerInfoContainer,
	RightHeaderContainer,
	RightIconGroup
} from '../../styles/Layout.style';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import { HomeIcon } from '../../assets';
const Notification = [
	'All notifications',
	'Downloads',
	'Mentions',
	'All comments',
	'All replies',
	'Replies only to my comments',
	'All likes ',
	'Likes only to my comments & replies ',
	'All notifications',
	'Friend requests',
	'Messenges'
];
const BlockedUser = [
	'darlene_robertson',
	'brooklyn_simmons_9',
	'darlene_robertson'
];
// import { UnivercityCap } from '../../assets/index';
import { logOut } from '../../store/global/globalReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Password from 'antd/lib/input/Password';
const LeftMenu = () => {
	const dispatch = useAppDispatch();

	const [Menus, setMenus] = useState([
		{
			menu: 'Profile settings',
			color: '#ECF4FF'
		},
		{
			menu: 'Password',
			color: 'white'
		},
		{
			menu: 'Social Profiles',
			color: 'white'
		},
		{
			menu: 'Notifications',
			color: 'white'
		},
		{
			menu: 'Billing',
			color: 'white'
		},
		{
			menu: 'Blocked users',
			color: 'white'
		},
		{
			menu: 'Privacy policy',
			color: 'white'
		}
	]);
	const [Menu, setMenu] = useState('Profile settings');
	const [Selected, setSelected] = useState(1);
	function onChange(date: any) {
		console.log(date);
	}
	function onChange1() {
		//console.log(`checked = ${e.target.checked}`);
	}
	return (
		<MainContainer>
			{/* Header part start */}
			<HeaderContainer>
				<HeaderHome className="height-full" span={1}>
					<HomeIcon alt="home" className="icon22" />
				</HeaderHome>
			</HeaderContainer>
			<Row id="main-column">
				<LeftSliderContainer>
					<LeftSlider />
				</LeftSliderContainer>

				<CenterColumn>
					<Row>
						<Col span={3} style={{ marginTop: 5 }}>
							<MenuItems>
								{Menus.map((item, index) => (
									<div
										onClick={() => {
											setMenus(
												Menus.map((items, index1) =>
													index === index1
														? { ...items, color: '#ECF4FF' }
														: { ...items, color: 'white' }
												)
											);

											setMenu(item.menu);
											console.log(item.menu, Menu);
										}}
										style={{ borderRadius: 5, backgroundColor: item.color }}
									>
										<MenuText style={{ marginLeft: 13 }}>{item.menu}</MenuText>
									</div>
								))}
							</MenuItems>
						</Col>
						<Col span={1}></Col>

						{Menu == 'Social Profiles' && (
							<Col span={4}>
								<Row style={{ justifyContent: 'center' }}>
									<SocialImportDiv>
										<div>
											<LinkedinOutlined
												style={{ fontSize: 22, margin: 7, color: '#686087' }}
											/>
										</div>
										<div style={{ alignSelf: 'center', color: '#686087' }}>
											<text>Import from Linkdin</text>
										</div>
									</SocialImportDiv>
									<SocialImportDiv>
										<div>
											<FacebookOutlined
												style={{ fontSize: 22, margin: 7, color: '#686087' }}
											/>
										</div>
										<div style={{ alignSelf: 'center', color: '#686087' }}>
											<text>Import from Facebook</text>
										</div>
									</SocialImportDiv>
									<SocialImportDiv>
										<div>
											<GoogleOutlined
												style={{ fontSize: 22, margin: 7, color: '#686087' }}
											/>
										</div>
										<div style={{ alignSelf: 'center', color: '#686087' }}>
											<text>Sign In with Google</text>
										</div>
									</SocialImportDiv>
								</Row>
							</Col>
						)}
						{Menu == 'Profile settings' && (
							<Col span={4}>
								<MenuItems>
									<EmailText>E-mail</EmailText>
									<EmailInput placeholder="Email address" />
									<DateText>Date of Birth</DateText>
									<Row>
										<Col span={8}>
											<DatePicker
												style={{ margin: 5, borderRadius: 5 }}
												defaultValue={moment('Aug', 'MMM')}
												format={'MMM'}
												size={'small'}
												onChange={(event: any) => onChange(event)}
												picker="month"
											/>
										</Col>
										<Col span={8}>
											<DatePicker
												style={{ margin: 5, borderRadius: 5 }}
												defaultValue={moment('19', 'D')}
												format={'D'}
												size={'small'}
												onChange={(event: any) => onChange(event)}
												picker="date"
											/>
										</Col>
										<Col span={8}>
											<DatePicker
												style={{ margin: 5, borderRadius: 5 }}
												defaultValue={moment('1995', 'YYYY')}
												format={'YYYY'}
												size={'small'}
												onChange={(event: any) => onChange(event)}
												picker="year"
											/>
										</Col>
									</Row>
									<AutoSaveRow>
										<CheckCircleOutlined
											style={{ marginTop: 16, marginRight: 5 }}
										/>
										<DateText>AutoSave edits</DateText>
									</AutoSaveRow>
								</MenuItems>
							</Col>
						)}
						{Menu == 'Password' && (
							<Col span={4}>
								<MenuItems>
									<EmailText>Current Password</EmailText>
									<Input.Password
										bordered={false}
										placeholder="**************"
										style={{ color: '#C4CEDB', background: '#F5F7F9' }}
										iconRender={visible =>
											visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
										}
									/>
									<EmailText>New Password</EmailText>
									<Input.Password
										bordered={false}
										placeholder="**************"
										style={{ color: '#C4CEDB', background: '#F5F7F9' }}
										iconRender={visible =>
											visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
										}
									/>
									<EmailText>Re-enter new Password</EmailText>
									<Input.Password
										bordered={false}
										placeholder="**************"
										style={{ color: '#C4CEDB', background: '#F5F7F9' }}
										iconRender={visible =>
											visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
										}
									/>
									<ResetButton>Reset password</ResetButton>
								</MenuItems>
							</Col>
						)}
						{Menu == 'Notifications' && (
							<Col span={4}>
								<div>
									{Notification.map(item => (
										<div style={{ paddingTop: 18 }}>
											<Checkbox onChange={onChange1}>
												<text style={{ color: '#686087', fontSize: 15 }}>
													{item}
												</text>
											</Checkbox>
										</div>
									))}
								</div>
							</Col>
						)}
						{Menu == 'Blocked users' && (
							<Col span={4}>
								<div style={{ paddingTop: 18 }}>
									<text
										style={{
											fontSize: 13,
											color: '#9F9AB2',
											padding: 10
										}}
									>
										{BlockedUser.length} users
									</text>
									{BlockedUser.map(item => (
										<Row
											style={{
												display: 'flex',
												flexDirection: 'row',
												marginTop: 15,
												justifyContent: 'space-between'
											}}
										>
											<Avatar size={35} icon={<UserOutlined />} />

											<text
												style={{ fontSize: 11, color: '#686087', marginTop: 5 }}
											>
												{item}
											</text>

											<div
												style={{
													border: ' 1px solid #686087',
													borderRadius: 30,
													height: 25,
													marginTop: 5
												}}
											>
												<text
													style={{
														fontSize: 11,
														color: '#686087',
														padding: 10
													}}
												>
													Unblock
												</text>
											</div>
										</Row>
									))}
								</div>
							</Col>
						)}
						{Menu == 'Billing' && <Col span={4}></Col>}

						{Menu == 'Privacy policy' && (
							<Col span={12}>
								<div>
									<text
										style={{
											//styleName: Heading/H2;
											fontFamily: 'Poppins',
											fontSize: 17,
											textAlign: 'left',
											fontWeight: 'bold'
										}}
									>
										Privacy Policy
									</text>
									<p>
										At Website Name, accessible at Website.com, one of our main
										priorities is the privacy of our visitors. This Privacy
										Policy document contains types of information that is
										collected and recorded by Website Name and how we use it. If
										you have additional questions or require more information
										about our Privacy Policy, do not hesitate to contact us
										through email at Email@Website.com This privacy policy
										applies only to our online activities and is valid for
										visitors to our website with regards to the information that
										they shared and/or collect in Website Name. This policy is
										not applicable to any information collected offline or via
										channels other than this website.
									</p>
									<text
										style={{
											//styleName: Heading/H2;
											fontFamily: 'Poppins',
											fontSize: 15,
											textAlign: 'left',
											fontWeight: 'bold'
										}}
									>
										Consent
									</text>
									<p>
										By using our website, you hereby consent to our Privacy
										Policy and agree to its terms. Information we collect The
										personal information that you are asked to provide, and the
										reasons why you are asked to provide it, will be made clear
										to you at the point we ask you to provide your personal
										information. If you contact us directly, we may receive
										additional information about you such as your name, email
										address, phone number, the contents of the message and/or
										attachments you may send us, and any other information you
										may choose to provide. When you register for an Account, we
										may ask for your contact information, including items such
										as name, company name, address, email address, and telephone
										number. How we use your information We use the information
										we collect in various ways, including to: Provide, operate,
										and maintain our website Improve, personalize, and expand
										our website Understand and analyze how you use our website
										Develop new products, services, features, and functionality
										Communicate with you, either directly or through one of our
										partners, including for customer service, to provide you
										with updates and other information relating to the website,
										and for marketing and promotional purposes Send you emails
										Find and prevent fraud Log Files Website Name follows a
										standard procedure of using log files. These files log
										visitors when they visit websites.
									</p>
								</div>
							</Col>
						)}
						{Menu == 'Privacy policy' && <Col span={2}></Col>}

						{Menu != 'Privacy policy' && <Col span={10}></Col>}
						<Col span={6}>
							<Row style={{ justifyContent: 'center' }}>
								<Avatar size={80} src={'https://joeschmoe.io/api/v1/random'} />
							</Row>
							<Row style={{ justifyContent: 'center' }}>
								<ProfileTitle>Jacob Jones</ProfileTitle>
							</Row>
							<Row style={{ justifyContent: 'center' }}>
								<text>Jacob_Jones</text>
							</Row>
							<Row style={{ justifyContent: 'center', color: '#25ca69' }}>
								<IntLevelText>Intraction level:</IntLevelText>
								<IntLevelText style={{ color: '#25ca69', marginLeft: 5 }}>
									Low
								</IntLevelText>
							</Row>
							<Row style={{ justifyContent: 'center' }}>
								<Col span={12}>
									<FriendsDiv>
										<FrndText>Friends</FrndText>
										<ProfileTitle>0</ProfileTitle>
									</FriendsDiv>
								</Col>
								<Col span={12}>
									<ReqDiv>
										<FrndText>Requests</FrndText>
										<ProfileTitle>5</ProfileTitle>
									</ReqDiv>
								</Col>
							</Row>
							<Row style={{ margin: '5%', justifyContent: 'space-around' }}>
								<SocialDiv>
									<LinkedinOutlined style={{ fontSize: 22, margin: 7 }} />
								</SocialDiv>
								<SocialDiv>
									<FacebookOutlined style={{ fontSize: 22, margin: 7 }} />
								</SocialDiv>
								<SocialDiv>
									<MailOutlined style={{ fontSize: 22, margin: 7 }} />
								</SocialDiv>
							</Row>
							<Divide />
							<Row style={{ paddingLeft: '2%', paddingRight: '10%' }}>
								<img
									src={
										'https://www.pngitem.com/pimgs/m/49-490355_transparent-graduation-cap-png-transparent-graduation-cap-icon.png'
									}
									height="20px"
									width="20px"
									style={{ marginRight: 10 }}
								/>
								<text>Harvard Univercity</text>
							</Row>
							<Row style={{ paddingLeft: '10%', paddingRight: '10%' }}>
								<text style={{ fontSize: 12, color: 'gray' }}>
									Cambridge, Massachusetts ,USA
								</text>
							</Row>
							<Row style={{ justifyContent: 'center', marginTop: '6%' }}>
								<Col span={8} style={{ borderWidth: 1 }}>
									<SubjectDiv>
										<FrndText style={{ marginTop: 4, marginBottom: 4 }}>
											Math
										</FrndText>
									</SubjectDiv>
								</Col>
								<Col span={8}>
									<SubjectDiv>
										<FrndText style={{ marginTop: 4, marginBottom: 4 }}>
											Ancient history
										</FrndText>
									</SubjectDiv>
								</Col>
								<Col span={8}>
									<SubjectDiv>
										<FrndText style={{ marginTop: 4, marginBottom: 4 }}>
											Science
										</FrndText>
									</SubjectDiv>
								</Col>
							</Row>
							<Row style={{ justifyContent: 'center', marginTop: 4 }}>
								<Col span={8} style={{ borderWidth: 1 }}>
									<SubjectDiv>
										<FrndText style={{ marginTop: 4, marginBottom: 4 }}>
											Physics
										</FrndText>
									</SubjectDiv>
								</Col>
								<Col span={8}>
									<SubjectDiv>
										<FrndText style={{ marginTop: 4, marginBottom: 4 }}>
											Technologies
										</FrndText>
									</SubjectDiv>
								</Col>
								<Col span={8}></Col>
							</Row>
							<div style={{ paddingTop: '4%' }} />
							<Row
								style={{
									backgroundColor: Selected == 1 ? '#ECF4FF' : 'white'
									// borderRadius: 5,
									//marginTop: 10
								}}
								onClick={() => {
									setSelected(1);
								}}
							>
								<div
									style={{
										alignSelf: 'center',
										paddingTop: '4%',
										paddingBottom: '4%',
										paddingLeft: '7%'
									}}
								>
									<SettingOutlined style={{ fontSize: 22 }} />
									<text style={{ marginLeft: 15, textAlign: 'center' }}>
										Settings & policy
									</text>
								</div>
							</Row>
							<Row
								style={{
									backgroundColor: Selected == 2 ? '#ECF4FF' : 'white'
									//borderRadius: 5,
									//marginTop: 10
								}}
								onClick={() => {
									setSelected(2);
								}}
							>
								<div
									style={{
										alignSelf: 'center',
										paddingTop: '4%',
										paddingBottom: '4%',
										paddingLeft: '7%'
									}}
								>
									<CustomerServiceOutlined style={{ fontSize: 22 }} />
									<text style={{ marginLeft: 15 }}>Help & Support</text>
								</div>
							</Row>

							<Row
								style={{
									//borderRadius: 5,
									backgroundColor: Selected == 3 ? '#ECF4FF' : 'white',
									marginTop: 10
								}}
								onClick={() => {
									setSelected(3);
									dispatch(logOut());
								}}
							>
								<div
									style={{
										alignSelf: 'center',
										paddingTop: '4%',
										paddingBottom: '4%',
										paddingLeft: '7%'
									}}
								>
									<LogoutOutlined style={{ fontSize: 22 }} />
									<text style={{ marginLeft: 15 }}>Log out</text>
								</div>
							</Row>
						</Col>
					</Row>
				</CenterColumn>
			</Row>
		</MainContainer>
	);
};

export default LeftMenu;
