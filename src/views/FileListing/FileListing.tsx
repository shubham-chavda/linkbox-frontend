import React, { useEffect, useState } from 'react';
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
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getDocumentList } from '../../store/global/globalReducer';
import { useAppSelector } from '../../hooks/useAppSelector';

export enum SORT_BY {
	ASC = "ASC",
	DESC = "DESC",
};

const FileListing = () => {
	const dispatch = useAppDispatch();
	const documentList = useAppSelector(
		(RootState) => RootState.global.documentList
	);
	const showMoreButton = useAppSelector(
		(RootState) => RootState.global.showMoreDocs
	);

	const [docClicked, setDocClicked] = useState(1);
	const [pageNo, setPageNo] = useState<number>(1);
	// const [docInfo, setDocInfo] = useState<object[]>([]);

	useEffect(() => {
		const data = { pageNo, sortBy: SORT_BY.ASC }
		dispatch(getDocumentList(data));
	}, []);

	const handleDocClick = (index: number) => {
		if (docClicked !== index) {
			setDocClicked(index);
			// setDocInfo(documentList[index].name);
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
							{documentList.map((document: any, index: number) => {
								console.log("document ------->", document);
								return (
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
												{document.name || "---"}
											</p>
										</Tooltip>
									</div>
								)
							})}
						</Row>

						<FileUpload />
						{/*---------------------- more Button ----------------*/}
						{showMoreButton && (
							<div className="flex justify-center mb2">
								<Button
									shape="round"
									className="color-sl"
									onClick={() => setPageNo(pageNo + 1)}
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
									ownerData={documentList[docClicked]}
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
