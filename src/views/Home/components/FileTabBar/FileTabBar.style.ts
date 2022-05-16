import { Tabs } from 'antd';
import styled from 'styled-components';

export const Tab = styled(Tabs)`
	&& .ant-tabs-nav {
		margin: 0 !important;
	}
	&& .ant-tabs-tab {
		border: none;
		background: white;
	}
	&& .ant-tabs-tab .ant-tabs-tab-btn {
		max-width: 200px;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		white-space: nowrap !important;
	}
	&& .ant-tabs-tab-active .ant-tabs-tab-btn {
		color: black;
		text-shadow: none;
	}
	&& .ant-tabs-tab-active {
		background: #f5f7f9;
	}
	&& .ant-tabs-nav-more {
		padding: 4px 10px !important;
	}
	&& .ant-tabs-nav::before {
		border: none !important;
	}
`;
