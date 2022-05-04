import React, { useEffect, useState } from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import { MemberCount } from './FileListing.style';
import { SearchOutlined } from '@ant-design/icons';
import {
	DefaultMap,
	DefaultPdf,
	DeleteIcon,
	DownloadButton,
	DropDownIcon,
	FilterDocIcon,
	FilterIcon,
	HomeIcon,
	PrintIcon,
	UploadDocumentIcon
} from '../../assets';
import { Button, Checkbox, Col, Input, notification, Row, Tooltip, Upload } from 'antd';
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
import { getDocumentList, setSelectedDocuments, uploadDocument } from '../../store/Documents/DocumentsReducer';

const { DOC_URL } = process.env;

export enum SORT_BY {
	ASC = 'ASC',
	DESC = 'DESC'
}

const FileListing = () => {
	const dispatch = useAppDispatch();
	const token = window.localStorage.getItem('token');

	const documentList = useAppSelector(
		(RootState) => RootState.documents.documentList
	);
	const showMoreButton = useAppSelector(
		(RootState) => RootState.documents.showMoreDocs
	);

	const [docClicked, setDocClicked] = useState(1);
	const [pageNo, setPageNo] = useState<number>(1);
	const [assendingOrder, setAssendingOrder] = useState<boolean>(true);
	// const [docInfo, setDocInfo] = useState<object[]>([]);

	useEffect(() => {
		const data = { pageNo, sortBy: assendingOrder ? SORT_BY.ASC : SORT_BY.DESC }
		dispatch(getDocumentList(data));
	}, [assendingOrder, pageNo]);

	const handleDocClick = (index: number) => {
		dispatch(setSelectedDocuments(documentList[index]));
		if (docClicked !== index) {
			setDocClicked(index);
			// setDocInfo(documentList[index].name);
		} else {
			history.navigate?.('/documents');
		}
	};

	const onUploadDocument = {
		name: 'file',
		action: `${DOC_URL}document/create`,
		headers: {
			'Content-Type': 'multipart/form-data',
			authorization: token ? 'Bearer ' + token : '',
		},
		customRequest: ({ file, onSuccess }: any) => {
			console.log("file ------->", file);
			let formData = new FormData();
			formData.append('name', file.name);
			formData.append('docfile', file);
			dispatch(uploadDocument(formData));
		},
		beforeUpload: (file: any) => {
			const isPDF = file.type === 'application/pdf';
			if (!isPDF) {
				notification.error({
					message: `${file.name} is not a pdf file`
				})
			}
			return isPDF || Upload.LIST_IGNORE;
		},
		onChange(info: any) {
			console.log("info.file -------->", info);
			if (info.file.status === 'done') {
				notification.success({
					message: `${info.file.name} file uploaded successfully`
				})
			} else if (info.file.status === 'error') {
				notification.error({
					message: `${info.file.response.message || "--"} failed to upload file.`
				})
			}
		},
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
						<HeaderFileTab className="flex items-center">
							<Input
								bordered={false}
								style={{ width: 250 }}
								placeholder="Search"
								prefix={<SearchOutlined />}
							/>
							<FilterIcon alt="filter" className="icon16" />
							<HeaderFileTab className="flex items-center">
								<Upload
									{...onUploadDocument}
									showUploadList={false}
								>
									<Button className="ml1 color-sl" type="link">
										<UploadDocumentIcon style={{ marginRight: "20px" }} />
										Upload document
									</Button>
								</Upload>
							</HeaderFileTab>
							<HeaderFileTab className="flex items-center">
								<Button
									className="ml1 color-sl"
									type="link"
									onClick={() => setAssendingOrder(!assendingOrder)}
								>
									<FilterDocIcon style={{ marginRight: "20px" }} />
									Recently added
									<DropDownIcon
										style={{
											marginLeft: "20px",
											transform: `rotate(${assendingOrder ? '180deg' : '0deg'} )`
										}}
									/>
								</Button>
							</HeaderFileTab>
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
								console.log('document ------->', document);
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
										<Tooltip
											placement="top"
											title={`${document.name || '---'}.pdf`}
										>
											<p
												style={{
													color:
														docClicked === index ? '#25CA69' : 'currentColor',
													width: '80%',
													// overflow: 'hidden',
													// textOverflow: 'ellipsis',
													// display: '-webkit-box',
													WebkitLineClamp: 2
													// WebkitBoxOrient: 'vertical'
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

						{!documentList.length ? <FileUpload /> : null}
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
									fileListing={true}
									ownerData={documentList[docClicked]}
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
			</MainContainer>
		</>
	);
};
export default FileListing;
