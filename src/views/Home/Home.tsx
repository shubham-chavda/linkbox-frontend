import React from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import {
	MainContainer,
	HeaderContainer,
	HeaderHome,
	HeaderFileTab,
	RightIconGroup,
	OwnerInfoContainer,
	RightHeaderContainer,
	CenterColumn,
	ContentSection,
	ExpandIconContainer
} from './Home.style';

import {
	BookmarkIcon,
	ChatIcon2,
	ExpandIcon,
	HomeIcon,
	InfoIcon,
	UserStarIcon
} from '../../assets';
import { Col, Row } from 'antd';
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo';
import MemberList from './components/MemberList/MemberList';
import FileTabBar from './components/FileTabBar/FileTabBar';
import ToolBar from './components/ToolBar/ToolBar';

import { initPanel } from '../../types/Home.interface';
import { Link } from 'react-router-dom';
const Home = () => {
	const [activeKey, setActiveKey] = React.useState('1');

	const initialPanes: initPanel = [
		{ title: 'Tab 1 ', content: 'Content of Tab 1', key: '1' },
		{ title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
		{ title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
		{ title: 'Tab 4', content: 'Content of Tab 4', key: '4' },
		{ title: 'Tab 5', content: 'Content of Tab 5', key: '5' },
		{ title: 'Tab 6', content: 'Content of Tab 6', key: '6' },
		{ title: 'Tab 7', content: 'Content of Tab 7', key: '7' },
		{ title: 'Tab 8', content: 'Content of Tab 8', key: '8' },
		{ title: 'Tab 9', content: 'Content of Tab 9', key: '9' },
		{ title: 'Tab 10', content: 'Content of Tab 10', key: '10' },
		{ title: 'Tab 11', content: 'Content of Tab 11', key: '11' },
		{ title: 'Tab 12', content: 'Content of Tab 12', key: '12' }
	];
	const onTabChange = (currentKey: string) => {
		setActiveKey(currentKey);
	};
	return (
		<>
			<MainContainer>
				{/* Header part start */}
				<HeaderContainer>
					<HeaderHome span={1}>
						<img src={HomeIcon} alt="home" className="icon22" />
					</HeaderHome>

					{/* File Tab bar start */}

					<HeaderFileTab span={18}>
						<FileTabBar initialPanes={initialPanes} onTabChange={onTabChange} />
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer>
							<ExpandIconContainer span={7}>
								<img src={ExpandIcon} alt="expand" className="icon22" />
							</ExpandIconContainer>
							<RightIconGroup span={16}>
								<img src={ChatIcon2} alt="chat" className="icon22" />
								<img src={BookmarkIcon} alt="bookmark" className="icon22" />
								<img src={UserStarIcon} alt="userStar" className="icon22" />
								<img src={InfoIcon} alt="Info" className="icon22" />
							</RightIconGroup>
						</RightHeaderContainer>
					</Col>

					{/* Header top right Icon tab over */}
				</HeaderContainer>
				{/* Header part Over */}

				<Row>
					{/* Left sider start */}
					<Col style={{ paddingTop: '20px' }}>
						<LeftSlider />
					</Col>
					{/* Left sider over */}

					{/* Content part start */}
					<CenterColumn>
						<Row>
							<ToolBar />
						</Row>

						<ContentSection>
							{initialPanes[+activeKey - 1].content}
						</ContentSection>
					</CenterColumn>

					{/* Content part over */}

					{/* right sider Start */}

					<Col style={{ paddingTop: '20px' }} span={5}>
						<Row>
							<OwnerInfoContainer>
								<OwnerInfo />
							</OwnerInfoContainer>
						</Row>
						<Row style={{ justifyContent: 'start' }}>
							<MemberList />
						</Row>
					</Col>

					{/* right sider Over */}
				</Row>
			</MainContainer>
		</>
	);
};
export default Home;
