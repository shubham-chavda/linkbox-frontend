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
} from './FileListing.style';

import { DefaultPDF, DeleteIcon, ExpandIcon, HomeIcon } from '../../assets';
import { Button, Col, Divider, Row, Tooltip } from 'antd';
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo';
import ShareLinks from '../ShareLinks/ShareLinks';
// import MemberList from './components/MemberList/MemberList';
// import FileTabBar from './components/FileTabBar/FileTabBar';
// import ToolBar from './components/ToolBar/ToolBar';

const FileListing = () => {
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
						{/* <FileTabBar initialPanes={initialPanes} onTabChange={onTabChange} /> */}
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer>
							<RightIconGroup span={10}>
								<img src={DeleteIcon} alt="chat" className="icon22" />
								<Button shape="round" style={{ color: '#686087' }}>
									Open
								</Button>
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
						<Row>{/* <ToolBar /> */}</Row>
						<p style={{ color: 'gray', marginLeft: '10px' }}>
							Personal Documents
						</p>
						<ContentSection>
							{[...Array(11)].map((_, index) => (
								<div
									key={index}
									style={{
										width: '160px'
									}}
								>
									<img src={DefaultPDF} width="138px" height="158px" />
									<Tooltip placement="top" title={`${index}.pdf`}>
										<p style={{ fontSize: '12px' }} className=" truncate px1 ">
											{index} Gmat official Guide 2019.pdf
										</p>
									</Tooltip>
								</div>
							))}

							{/*---------------------- more Button ----------------*/}
						</ContentSection>
						{true && (
							<div className="flex justify-center">
								<Button shape="round" style={{ color: '#686087' }}>
									More
								</Button>
							</div>
						)}
						<Divider
							orientation="left"
							orientationMargin="0px"
							style={{ fontSize: '13px', color: 'gray' }}
						>
							Documents from Others
						</Divider>
						<ContentSection>
							{[...Array(11)].map((_, index) => (
								<div key={index} style={{ width: '160px' }}>
									<img src={DefaultPDF} width="138px" height="158px" />
									<Tooltip placement="top" title={`${index}.pdf`}>
										<p style={{ fontSize: '12px' }} className=" truncate px1 ">
											{index} Gmat official Guide 2019.pdf
										</p>
									</Tooltip>
								</div>
							))}
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
							<OwnerInfoContainer>
								<ShareLinks />
							</OwnerInfoContainer>
						</Row>
					</Col>

					{/* right sider Over */}
				</Row>
			</MainContainer>
		</>
	);
};
export default FileListing;
