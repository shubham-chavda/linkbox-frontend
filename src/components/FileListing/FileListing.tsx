import React, { useState } from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import { MemberCount } from './FileListing.style';
import { SearchOutlined } from '@ant-design/icons';
import {
	DefaultMap,
	DefaultPdf,
	DeleteIcon,
	DownloadButton,
	FilterIcon,
	HomeIcon,
	PrintIcon
} from '../../assets';
import { Button, Checkbox, Col, Input, Row, Tooltip } from 'antd';
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo';
import ShareLinks from '../ShareLinks/ShareLinks';
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

const FileListing = () => {
	const [docClicked, setDocClicked] = useState(false);
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
						<HeaderFileTab span={6} className="flex items-center">
							<Input
								bordered={false}
								style={{ width: 250 }}
								placeholder="Search"
								prefix={<SearchOutlined />}
							/>
							<img src={FilterIcon} alt="filter" className="icon16" />
						</HeaderFileTab>
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer className="flex-start">
							<LeftIconGroup span={6}>
								<img
									src={DownloadButton}
									alt="download"
									className="mr1 icon22"
								/>
								<img src={PrintIcon} alt="Print" className="icon22" />
							</LeftIconGroup>
							<RightIconGroup span={15} className="pr2 justify-end">
								<img src={DeleteIcon} alt="delete" className="icon22" />
								<Button className="ml1 color-sl" shape="round">
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
					<LeftSliderContainer>
						<LeftSlider />
					</LeftSliderContainer>
					{/* Left sider over */}

					{/* Content part start */}
					<CenterColumn
						className="overflow-auto"
						style={{ height: 'calc(100vh - 40px)' }}
					>
						<p className="ml1" style={{ color: '#C5C9CE' }}>
							Personal Documents
						</p>
						<Row>
							{[...Array(31)].map((_, index) => (
								<div
									key={index}
									style={{
										width: '160px'
									}}
								>
									<img src={DefaultPdf} width="138px" height="158px" />
									<Tooltip placement="top" title={`${index}.pdf`}>
										<p className=" truncate px1 font-12">
											{index} Gmat official Guide 2019.pdf
										</p>
									</Tooltip>
								</div>
							))}

							{/*---------------------- more Button ----------------*/}
						</Row>
						{true && (
							<div className="flex justify-center mb2">
								<Button className="color-sl" shape="round">
									More
								</Button>
							</div>
						)}
					</CenterColumn>

					{/* Content part over */}

					{/* right sider Start */}

					<Col className="pt1" span={5}>
						<Row>
							<OwnerInfoContainer>
								<OwnerInfo fileListing={true} />
							</OwnerInfoContainer>
						</Row>

						<OwnerInfoContainer>
							<ShareLinks />
						</OwnerInfoContainer>

						<Row className="flex justify-center align-center py1">
							<MemberCount className="pt1 font-12">28 members</MemberCount>
							<Checkbox
								className="py1 font-12 color-sl"
								style={{ width: '90%' }}
								// onChange={onChange}
							>
								Allow location
							</Checkbox>
							<Col span={23} className="flex justify-center">
								<img src={DefaultMap} width="80%" />
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
