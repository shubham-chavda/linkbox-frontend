import React, { useEffect, useState } from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import { MemberCount } from './FileListing.style';
import {
	CloudUploadOutlined,
	FolderOutlined,
	SearchOutlined
} from '@ant-design/icons';
import {
	BookmarkIcon,
	DefaultMap,
	DefaultPdf,
	DeleteIcon,
	DownloadButton,
	DropDownIcon,
	FilterDocIcon,
	FilterIcon,
	HomeIcon,
	PrintIcon
} from '../../assets';
import {
	Button,
	Checkbox,
	Col,
	Input,
	notification,
	Row,
	Tooltip,
	Upload
} from 'antd';
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
import { useAppSelector } from '../../hooks/useAppSelector';
import {
	getDocumentInfo,
	getDocumentList,
	setSelectedDocuments
} from '../../store/Documents/DocumentsReducer';

import UploadFileModal from './components/UploadFileModal';
import CreateFolderModal from './components/CreateFolderModal';

const { DOC_URL } = process.env;

export enum SORT_BY {
	ASC = 'ASC',
	DESC = 'DESC'
}

const FileListing = () => {
	const dispatch = useAppDispatch();

	const documentList = useAppSelector(
		(RootState) => RootState.documents.documentList
	);
	const showMoreButton = useAppSelector(
		(RootState) => RootState.documents.showMoreDocs
	);

	const [docClicked, setDocClicked] = useState(0);
	const [pageNo, setPageNo] = useState<number>(1);
	const [searchString, setSearchString] = useState('');
	const [assendingOrder, setAssendingOrder] = useState<boolean>(true);
	const [currentDocument, setCurrentDocument] = useState({});
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

	useEffect(() => {
		const data = {
			pageNo,
			q: searchString,
			sortBy: assendingOrder ? SORT_BY.ASC : SORT_BY.DESC
		};
		dispatch(getDocumentList(data));
	}, [assendingOrder, pageNo, searchString.length > 3]);

	useEffect(() => {
		setCurrentDocument(documentList[0]);
	}, [documentList]);

	// const handleDocClick = (index: number, isFolder: boolean) => {
	// 	dispatch(setSelectedDocuments(documentList[index]));
	// 	// setCurrentDocument(documentList[index]);
	// 	if (docClicked !== index) {
	// 		setDocClicked(index);
	// 	} else {
	// 		if (isFolder) {
	// 			console.log(
	// 				'🚀 ~ file: FileListing.tsx ~ line 90 ~ handleDocClick ~ isFolder',
	// 				isFolder
	// 			);
	// 		} else history.navigate?.(`/document-detail/${documentList[index].uuid}`);
	// 		// history.navigate?.('/documents');
	// 	}
	// };
	const handleDocClick = (index: number, isFolder: boolean) => {
		dispatch(setSelectedDocuments(documentList[index]));
		if (docClicked !== index) {
			setDocClicked(index);
			console.log('documentList[index]= ======>', documentList[index]);
			dispatch(getDocumentInfo({ uuid: documentList[index].uuid }));
			// setDocInfo(documentList[index].name);
		} else {
			if (isFolder) {
				console.log(
					'🚀  file: FileListing.tsx  line 90  handleDocClick  isFolder',
					isFolder
				);
			} else history.navigate?.(`/document-detail/${documentList[index].uuid}`);
			// history.navigate?.('/documents');
		}
	};

	const onChange = (e: any) => {
		setSearchString(e.target.value);
	};

	return (
		<>
			<MainContainer>
				{/*---------------- Modal for Create Folder ------- */}
				{isCreateFolderModalOpen && (
					<CreateFolderModal
						isOpen={isCreateFolderModalOpen}
						closeModal={() => setIsCreateFolderModalOpen(false)}
					/>
				)}
				{/* Header part start */}
				<HeaderContainer>
					<HeaderHome className="height-full" span={1}>
						<HomeIcon alt="home" className="icon22" />
					</HeaderHome>

					{/* File Tab bar start */}

					<HeaderFileTab span={18} className="flex">
						<HeaderFileTab span={6} className="flex items-center">
							<Input
								bordered={false}
								style={{ width: 250 }}
								placeholder="Search"
								prefix={<SearchOutlined />}
								onChange={onChange}
							/>
							<FilterIcon alt="filter" className="icon16" />
						</HeaderFileTab>

						<div className="fluid flex justify-end">
							<Button
								className="color-light-gray border-light-gray mr1"
								shape="round"
							>
								Store
							</Button>
							<div
								style={{
									borderLeft: '1px solid #e3ecf3'
								}}
								className="flex items-center"
							>
								<Button
									className="ml1 color-light-gray"
									type="link"
									onClick={() => setIsCreateFolderModalOpen((prev) => !prev)}
								>
									<FolderOutlined
										style={{ fontSize: '16px', color: 'black' }}
									/>
									Create Folder
									{isCreateFolderModalOpen && (
										<span className="ml1 font-13 color-sd2">X</span>
									)}
								</Button>
							</div>
							<div
								style={{
									borderLeft: '1px solid #e3ecf3'
								}}
								className="flex items-center"
							>
								{/* <Upload {...onUploadDocument} showUploadList={false}> */}
								<Button
									className="ml1 color-light-gray"
									type="link"
									onClick={() => setIsUploadModalOpen((prev) => !prev)}
								>
									<CloudUploadOutlined
										style={{ fontSize: '16px', color: 'black' }}
									/>
									Upload document
									{isUploadModalOpen && (
										<span
											className="ml1 font-13 color-sd2"
											// onClick={() => setIsUploadModalOpen(false)}
										>
											X
										</span>
									)}
								</Button>
								{/* </Upload> */}
							</div>
							<div
								style={{
									borderLeft: '1px solid #e3ecf3'
								}}
							>
								<Button
									className="ml1 color-light-gray flex items-center"
									type="link"
									onClick={() => setAssendingOrder(!assendingOrder)}
								>
									<FilterDocIcon className="mr2" />
									Recently added
									<DropDownIcon
										style={{
											marginLeft: '20px',
											transform: `rotate(${assendingOrder ? '180deg' : '0deg'})`
										}}
									/>
								</Button>
							</div>
						</div>
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer className="flex-start">
							<Col
								span={4}
								className="height-full flex justify-center items-center"
								style={{ borderRight: '1px solid #ECF2F7' }}
							>
								<BookmarkIcon alt="bookmark" className="icon22" />
							</Col>
							<LeftIconGroup span={7}>
								<DownloadButton alt="download" className="mr1 icon22" />
								<PrintIcon alt="Print" className="icon22" />
							</LeftIconGroup>
							<RightIconGroup span={12} className="pr2 justify-end">
								<DeleteIcon alt="delete" className="icon22" />
								<Button
									className="ml1 color-light-gray border-light-gray"
									shape="round"
								>
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
						{!documentList.length ? (
							<FileUpload />
						) : (
							<>
								{/*---------------- Modal for Upload File ------- */}
								{isUploadModalOpen && (
									<UploadFileModal isOpen={isUploadModalOpen} />
								)}

								{/*---------------- File Listing ------- */}
								<p className="ml1" style={{ color: '#C5C9CE' }}>
									Personal Documents
								</p>
								<Row>
									{documentList.map((document: any, index: number) => {
										console.log('document ------->', document);
										return (
											<div
												key={index}
												style={{ width: '160px' }}
												onClick={() =>
													handleDocClick(index, document?.isFolder)
												}
												className={`${
													docClicked !== index ? 'hover-blue' : ''
												}`}
											>
												{/* if document object is folder */}
												{document?.isFolder ? (
													<DefaultPdf
														width="138px"
														height="158px"
														stroke={docClicked === index ? '#25CA69' : 'red'}
														color={docClicked === index ? '#25CA69' : '#1379FF'}
													/>
												) : (
													<DefaultPdf
														width="138px"
														height="158px"
														stroke={
															docClicked === index ? '#25CA69' : '#ECF2F7'
														}
														color={docClicked === index ? '#25CA69' : '#1379FF'}
													/>
												)}
												<Tooltip
													placement="top"
													title={`${document.name || '---'}`}
												>
													<p
														style={{
															width: '80%',
															WebkitLineClamp: 2,
															color:
																docClicked === index
																	? '#25CA69'
																	: 'currentColor'
														}}
														className="truncate pl2 font-12"
													>
														{document.name || '---'}
													</p>
												</Tooltip>
											</div>
										);
									})}
								</Row>
							</>
						)}

						{/*---------------------- more Button ----------------*/}
						{showMoreButton && (
							<div className="flex justify-center mb2">
								<Button
									shape="round"
									className="color-light-gray"
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
							<OwnerInfoContainer className="fluid">
								<OwnerInfo
									fileListing={true}
									ownerData={documentList[docClicked]}
								/>
							</OwnerInfoContainer>
						</Row>

						<OwnerInfoContainer>
							<ShareLinks
								isShareable={documentList[docClicked]?.isShareable}
								DocId={documentList[docClicked]?.uuid}
							/>
						</OwnerInfoContainer>

						<Row className="flex justify-center align-center py1">
							<MemberCount className="pt1 font-12">28 members</MemberCount>
							<Checkbox
								style={{ width: '90%' }}
								className="py1 font-12 color-light-gray"
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
			</MainContainer>
		</>
	);
};
export default FileListing;
