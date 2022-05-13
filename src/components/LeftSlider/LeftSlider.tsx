import React, { PureComponent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Modal, Button, Row, Col, Avatar, Divider } from 'antd';
import { AvatarImg, Sider, SiderMenu, StyledModal } from './LeftSlider.style';
import { BellIcon, ChatIcon } from '../../assets';
import { logOut } from '../../store/global/globalReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
	UserOutlined,
	SettingOutlined,
	CustomerServiceOutlined,
	LogoutOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import nameInitials from 'name-initials';

interface ILeftSlider {
	user: any;
}
const LeftSlider = (props: ILeftSlider) => {
	const { user } = props;
	// state = {
	// 	isCollapsed: false,
	// 	selectedMenu: "dashboard",
	// };

	// componentDidMount() {
	// 	window.addEventListener("resize", this.updateDimensions);
	// 	this.updateDimensions();
	// }
	// componentWillUnmount() {
	// 	window.removeEventListener("resize", this.updateDimensions);
	// }

	// updateDimensions = () => {
	// 	const { innerWidth } = window;
	// 	if (innerWidth < 1000) {
	// 		this.setState({ isCollapsed: true });
	// 	} else {
	// 		this.setState({ isCollapsed: false });
	// 	}
	// };

	// const { isCollapsed, selectedMenu } = this.state;
	// const {location} = this.props;

	const dispatch = useAppDispatch();
	const [visible, setVisible] = React.useState(false);

	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [modalText, setModalText] = React.useState('Content of the modal');

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setModalText('The modal will be closed after two seconds');
		setConfirmLoading(true);
		setTimeout(() => {
			setVisible(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisible(false);
	};
	const renderModal = () => {
		return (
			<StyledModal
				visible={visible}
				onOk={handleOk}
				style={{ top: 43, left: -600 }}
				closable={false}
				bodyStyle={{
					borderRadius: 16,
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 20
				}}
				zIndex={1}
				width={270}
				footer={null}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				mask={false}
			>
				<Row style={{ display: 'flex', flexDirection: 'row' }}>
					<Avatar size={40} src={'https://joeschmoe.io/api/v1/random'} />
					<div style={{ marginLeft: 10 }}>
						<text style={{ fontSize: 12 }}>jacob_Jones</text>
						<div
							style={{
								background: 'rgba(19, 121, 255, 0.08)',
								boxSizing: 'border-box',
								width: 60,
								borderRadius: 50
							}}
						>
							<text
								style={{
									fontFamily: 'Poppins',
									fontSize: 12,
									color: '#1379FF',
									marginLeft: 11
								}}
							>
								user
							</text>
						</div>
					</div>
				</Row>
				<Divider style={{ margin: 8 }} />
				<Row style={{ borderRadius: 5 }}>
					<div style={{ alignSelf: 'center' }}>
						<SettingOutlined style={{ fontSize: 16 }} />
						<text style={{ marginLeft: 15, textAlign: 'center' }}>
							<Link style={{ color: 'black' }} to="/profile/">
								Settings & policy
							</Link>
						</text>
					</div>
				</Row>
				<Divider style={{ margin: 8 }} />
				<Row style={{ borderRadius: 5 }}>
					<div style={{ alignSelf: 'center' }}>
						<CustomerServiceOutlined style={{ fontSize: 16 }} />
						<text style={{ marginLeft: 15 }}>Help & Support</text>
					</div>
				</Row>
				<Divider style={{ margin: 8 }} />
				<Row
					style={{ borderRadius: 5, marginTop: 30 }}
					onClick={() => dispatch(logOut())}
				>
					<div style={{ alignSelf: 'center' }}>
						<LogoutOutlined style={{ fontSize: 16 }} />
						<text style={{ marginLeft: 15 }}>Log out</text>
					</div>
				</Row>
			</StyledModal>
		);
	};

	const menu = (
		// <AvatarImg src={'https://joeschmoe.io/api/v1/random'} size={30} />
		<Fragment>
			{renderModal()}

			<Menu.Item
				key="/"
				style={{ backgroundColor: 'white' }}
				onClick={
					showModal
					// dispatch(logOut())
				}
				icon={
					<Avatar
						style={{ backgroundColor: '#25CA69', color: 'white' }}
						// src="https://joeschmoe.io/api/v1/random"
						alt="name"
						size={30}
					>
						{nameInitials(user?.fullName || '-')}
					</Avatar>
				}
			></Menu.Item>

			<Menu.Item
				key="/messages/"
				icon={<ChatIcon alt="chat" width="25px" height="25px" />}
			>
				<Link to="/messages/">Messages</Link>
			</Menu.Item>

			<Menu.Item
				key="/Notifications/"
				icon={<BellIcon alt="notification" width="25px" height="25px" />}
			>
				<Link to="/Notifications/">Notifications</Link>
			</Menu.Item>
		</Fragment>
	);

	return (
		<Sider theme="light" collapsed={true}>
			{/* <StrongName>{isCollapsed ? "LB" : "LinkBox"}</StrongName> */}
			<SiderMenu
				theme="light"
				mode="inline"

				// defaultSelectedKeys={[selectedMenu]}
				// selectedKeys={[location.pathname]}
			>
				{menu}
			</SiderMenu>
		</Sider>
	);
};

// LeftSlider.propTypes = {

// };
const mapStateToProps = (state: any) => ({
	user: state.global.user
});

export default connect(mapStateToProps)(LeftSlider);
