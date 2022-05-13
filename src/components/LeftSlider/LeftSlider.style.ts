import styled from 'styled-components';
import { Avatar, Layout, Menu } from 'antd';
import { Modal } from 'antd';

export const Sider = styled(Layout.Sider)`
	&& {
		/* padding-top:20px; */
		/* height: 100vh; */
		/* z-index: 100; */
		width: 61px !important;
		min-width: 61px !important;
		&& .ant-menu-item-selected {
			background: #3973e6;
		}
		&& .ant-menu-dark .ant-menu-inline.ant-menu-sub {
			background: #0f1012;
		}
		&& .ant-layout-sider-trigger {
			height: 40px;
		}
	}
`;

export const SiderMenu = styled(Menu)`
	&& {
		border: none !important;
		margin-left: -5px;
		width: 60px !important;
		height: calc(100% - 57px);
		overflow: overlay;

		&& .ant-menu-item {
			margin-bottom: 30px;
		}
	}
`;

export const AvatarImg = styled(Avatar)`
	border: 1px solid gray;
`;
export const StyledModal = styled(Modal)`
	&& .ant-modal-content {
		border-radius: 12px;
	}
`;
