import React from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import {
	MainContainer,
	HeaderContainer,
	HeaderHome,
	RightIconGroup,
	OwnerInfoContainer,
	RightHeaderContainer,
	CenterColumn,
	MemberCount,
	HeaderSubContainer
} from './FileListing.style';
import { SearchOutlined } from '@ant-design/icons';
import {
	DefaultMap,
	DefaultPDF,
	DeleteIcon,
	FilterIcon,
	HomeIcon
} from '../../assets';
import { Button, Checkbox, Col, Divider, Input, Row, Tooltip } from 'antd';
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo';
import ShareLinks from '../ShareLinks/ShareLinks';

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

					<HeaderSubContainer span={18}>
						<HeaderSubContainer span={6} className="flex items-center">
							<Input
								bordered={false}
								style={{ width: 250 }}
								placeholder="Search"
								prefix={<SearchOutlined />}
							/>
							<img src={FilterIcon} alt="filter" className="icon16" />
						</HeaderSubContainer>
					</HeaderSubContainer>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer>
							<RightIconGroup span={10}>
								<img src={DeleteIcon} alt="delete" className="icon22" />
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
						<p style={{ color: '#C5C9CE', marginLeft: '10px' }}>
							Personal Documents
						</p>
						<Row>
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
						</Row>
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
							style={{ fontSize: '13px', color: '#C5C9CE' }}
						>
							Documents from Others
						</Divider>
						<Row>
							{[...Array(2)].map((_, index) => (
								<div key={index} style={{ width: '160px' }}>
									<img src={DefaultPDF} width="138px" height="158px" />
									<Tooltip placement="top" title={`${index}.pdf`}>
										<p style={{ fontSize: '12px' }} className=" truncate px1 ">
											{index} Gmat official Guide 2019.pdf
										</p>
									</Tooltip>
								</div>
							))}
						</Row>
					</CenterColumn>

					{/* Content part over */}

					{/* right sider Start */}

					<Col style={{ paddingTop: '20px' }} span={5}>
						<Row>
							<OwnerInfoContainer>
								<OwnerInfo />
							</OwnerInfoContainer>
						</Row>

						<OwnerInfoContainer>
							<ShareLinks />
						</OwnerInfoContainer>

						<Row
							className="flex justify-center  py1 "
							style={{ height: '44%' }}
						>
							<MemberCount>28 members</MemberCount>
							<Checkbox
								className="py1"
								style={{ width: '90%', color: '#686087' }}
								// onChange={onChange}
							>
								Allow location
							</Checkbox>
							<Col span={23}>
								<img src={DefaultMap} width="100%" height="230px" />
							</Col>
						</Row>
					</Col>

					{/* right sider Over */}
				</Row>
			</MainContainer>
		</>
	);
};
export default FileListing;
