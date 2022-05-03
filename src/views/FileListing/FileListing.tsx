import React, { useEffect, useState } from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import { MemberCount, UploadButtonsWrap } from './FileListing.style';
import { SearchOutlined } from '@ant-design/icons';
import {
	DefaultMap,
	DefaultPdf,
	DefaultPdfGreen,
	DeleteIcon,
	DownloadButton,
	FilterIcon,
	HomeIcon,
	PrintIcon
} from '../../assets';
import { Button, Checkbox, Col, Input, Row, Tooltip } from 'antd';
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo';
import ShareLinks from '../../components/ShareLinks/ShareLinks';
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
import history from '../../history';
import FileUpload from './components/FileUpload/FileUpload';
import axios from 'axios';

const { DOC_URL } = process.env;


const FileListing = () => {
	// const dispatch = useAppDispatch();
	const [docClicked, setDocClicked] = useState(0);
	const [docSize, setDocSize] = useState(0);
	const [ownerInfo, setOwnerInfo] = useState<object[]>([]);
	// const isUserExist = useAppSelector((state) => state.global.user);
	// useEffect(() => {
	// 	if (window.localStorage.getItem('token')) {
	// 		if (!isUserExist) dispatch(getUserDetails());
	// 	} else history.navigate?.('/login');
	// }, []);

	useEffect(() => {
		const data = [];
		for (let i = 0; i < docSize; i++) {
			const ownerdata = {
				key: i,
				name: `jacob_jones ${i}`,
				fileName: `Gmat Official Guide 2019 ${i}`,
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'
			};
			data.push(ownerdata);
		}
		setOwnerInfo(data);
	}, [docSize]);
	const handleDocClick = (index: number) => {
		if (docClicked !== index) {
			setDocClicked(index);
		} else history.navigate?.('/documents');
	};
	return (
		<>
			<MainContainer>
				{/* Header part start */}
				<HeaderContainer>
					<HeaderHome className="height-full" span={1}>
						<HomeIcon alt="home" className="icon22" />
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
							<FilterIcon alt="filter" className="icon16" />
						</HeaderFileTab>
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer className="flex-start">
							<LeftIconGroup span={6}>
								<DownloadButton alt="download" className="mr1 icon22" />
								<PrintIcon alt="Print" className="icon22" />
							</LeftIconGroup>
							<RightIconGroup span={15} className="pr2 justify-end">
								<DeleteIcon alt="delete" className="icon22" />
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
							{[...Array(docSize)].map((_, index) => (
								<div
									className={`${docClicked !== index ? 'hover-blue' : ''}`}
									key={index}
									style={{
										width: '160px'
									}}
									onClick={() => handleDocClick(index)}
								>
									<DefaultPdf
										stroke={docClicked === index ? '#25CA69' : '#ECF2F7'}
										width="138px"
										height="158px"
										color={docClicked === index ? '#25CA69' : '#1379FF'}
									/>
									<Tooltip placement="top" title={`${index}.pdf`}>
										<p
											style={{
												color:
													docClicked === index ? '#25CA69' : 'currentColor',
												width: '80%',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												display: '-webkit-box',
												WebkitLineClamp: 2,
												WebkitBoxOrient: 'vertical'
											}}
											className=" pl2 font-12"
										>
											{index} Gmat official Guide 2019.pdf
										</p>
									</Tooltip>
								</div>
							))}
						</Row>

						<FileUpload />
						{/*---------------------- more Button ----------------*/}
						{true && (
							<div className="flex justify-center mb2">
								<Button
									onClick={() => setDocSize((prev) => prev + 14)}
									className="color-sl"
									shape="round"
								>
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
								<OwnerInfo
									ownerData={ownerInfo[docClicked]}
									fileListing={true}
								/>
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
								<img src={DefaultMap} height="190px" width="80%" />
							</Col>
						</Row>
					</Col>

					{/* right sider Over */}
				</Row>
			</MainContainer >
		</>
	);
};
export default FileListing;
