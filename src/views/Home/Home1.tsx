/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import {
	ContentSection,
	RightCollapsibleSider,
	WebviewerSection
} from './Home.style';

import WebViewer from '@pdftron/webviewer';
import { CollabClient } from '@pdftron/collab-client';

import {
	BookmarkIcon,
	ChatIcon,
	ChatIcon2,
	CopyIcon,
	ExpandIcon,
	HandMoveIcon,
	HomeIcon,
	InfoIcon,
	UserStarIcon
} from '../../assets';
import { Col, notification, Row } from 'antd';
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo';
import MemberList from './components/MemberList/MemberList';
import FileTabBar from './components/FileTabBar/FileTabBar';
import ToolBar from './components/ToolBar/ToolBar';

import { initPanel } from '../../types/Home.interface';
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
import { ExpandAltOutlined } from '@ant-design/icons';
import Comment from '../../components/Comment';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getDocumentInfo } from '../../store/Documents/DocumentsReducer';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
const { DOC_URL } = process.env;

declare global {
	interface Window {
		Core: any;
	}
}

const Home = (props: any) => {
	const dispatch = useAppDispatch();
	const { id: documentID } = useParams();
	const { isLoading } = props;

	const documentList = useAppSelector(
		(RootState) => RootState.documents.documentList
	);
	const selectedDocumentInfo = useAppSelector(
		(RootState) => RootState.documents.selectedDocumentInfo
	);
	const [rightSiderClicks, setRightSiderClicks] = useState('info');
	const viewer: any = useRef(null);
	const scrollView = useRef(null);
	const searchTerm = useRef(null);

	const [maxCount, setMaxCount] = useState(10);
	const [activeKey, setActiveKey] = useState('1');
	const [collapsed, setCollapsed] = useState(false);

	const [documentViewer, setDocumentViewer] = useState<any>(null);
	const [annotationManager, setAnnotationManager] = useState<any>(null);
	const [annotations, setAnnotations] = useState<any>(null);

	const [searchResults, setSearchResults] = useState<any>([]);

	const [editBoxAnnotation, setEditBoxAnnotation] = useState(null);
	const [editBoxCurrentValue, setEditBoxCurrentValue] = useState(null);
	const [documentInstance, setDocumentInstance] = useState<any>(null);
	const [loadDocument, setLoadDocument] = useState(false);

	const initialPanes: initPanel = [
		{
			title: selectedDocumentInfo
				? selectedDocumentInfo.name
				: 'PdfTron default',
			content: 'Content of Tab 1',
			key: '1'
		}
	];
	useEffect(() => {
		dispatch(getDocumentInfo({ uuid: documentID }));
	}, []);
	useEffect(() => {
		if (!loadDocument && selectedDocumentInfo) {
			setLoadDocument(true);
			loadPdfDocumentByPath(
				`${DOC_URL}document/fetch/${selectedDocumentInfo?.docUrl}`
			);
		}
		// else {
		// 	loadPdfDocumentByPath(
		// 		'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
		// 	);
		// }
	}, [selectedDocumentInfo]);

	const loadPdfDocumentByPath = (documentPath: string) => {
		WebViewer(
			{
				path: "/webviewer/lib",//'https://lbweb.dev.brainvire.net/lib',
				initialDoc: documentPath,
				fullAPI: true,
				disabledElements: [
					'header',
					'toolsHeader',
					'searchPanel',
					'contextMenuPopup'
				],
				css: '/test.css'
			},
			viewer.current
		).then(async (instance) => {
			const { Annotations, Search, annotationManager } = instance.Core;

			// const Core = instance.Core;
			// Core.enableFullPDF();
			// const documentViewer = new Core.DocumentViewer();
			// documentViewer.setScrollViewElement(scrollView.current!);
			// documentViewer.setViewerElement(viewer.current);
			// documentViewer.setOptions({ enableAnnotations: true });
			// setDocumentViewer(Core.documentViewer);
			// setDocumentInstance(instance);
			// setAnnotationManager(annotationManager);
			// setAnnotations(Annotations);
			// documentViewer.disableViewportRenderMode();
			// const LayoutMode = instance.UI.LayoutMode;
			// instance.UI.setLayoutMode(LayoutMode.FacingContinuous);

			// instance.UI.textPopup.update([
			// 	{
			// 		type: 'actionButton',
			// 		img: '/Icons/copyIcon.svg',
			// 		onClick: () => instance.UI.Feature.Copy
			// 	},
			// 	{
			// 		type: 'actionButton',
			// 		img: '/Icons/chatIcon.svg',
			// 		onClick: () => instance.UI.Feature.NotesPanel
			// 	},
			// 	{
			// 		type: 'actionButton',
			// 		img: '/Icons/bookmarkIcon.svg',
			// 		onClick: () => instance.Core.Bookmark
			// 	},
			// 	{
			// 		type: 'actionButton',
			// 		img: '/Icons/userStarIcon.svg'
			// 	}
			// ]);

			const client = new CollabClient({
				instance,
				logLevel: CollabClient.LogLevels.DEBUG,
				filterLogsByTag: CollabClient.LogTags.AUTH,
				url: 'https://lbnotifapi.dev.brainvire.net',
				subscriptionUrl: 'wss://lbnotifapi.dev.brainvire.net/subscribe'
			});
			const token = window.localStorage.getItem('token');
			// console.log("client --------->", client);

			// documentViewer.loadAsync()
			console.log('token ------>', token);

			const responseLogin = await client.loginWithToken(token || '');
			console.log('responseLogin ------->', responseLogin);
			// const docContext = await client.setContext({ id: responseLogin.id });
			// console.log('doc --------->', docContext);
			if (!responseLogin) {
				// notification.error({
				// 	message: 'Login is failed Please refresh page....'
				// });
				return false;
			}

			await client.setCustomHeaders({ authorization: token || '' });
			// console.log("documentID ---------->", documentID);
			const doc = await responseLogin.getDocument(selectedDocumentInfo.id || '');
			console.log('doc ------->', doc);
			// const viewDoc = await doc.view(documentPath);
			// console.log("viewDoc ------->", viewDoc);

			console.log('isAuthor', doc.isAuthor);
			console.log('isMember', doc.isMember());

			client.EventManager.subscribe('annotationAdded', (annotation) => {
				console.log('annotation ---------->', annotation);
				annotation.subscribe('onChange', (updatedAnnotation) => {
					console.log('annotation changed', updatedAnnotation);
				});
			});

			const style = instance.UI.iframeWindow.document.documentElement.style;
			style.setProperty(`--document-background-color`, 'white');
		});
	};

	const searchListener = (searchPattern: any, options: any, results: any) => {
		console.log('results ------->', results);

		const newAnnotations = results.map((result: any) => {
			const annotation = new annotations.RedactionAnnotation();
			annotation.PageNumber = result.pageNum;
			annotation.Quads = result.quads.map((quad: any) => quad.getPoints());
			annotation.StrokeColor = new annotations.Color(136, 39, 31);
			return annotation;
		});

		setSearchResults(results);

		annotationManager.addAnnotations(newAnnotations);
		annotationManager.drawAnnotationsFromList(newAnnotations);
	};

	const zoomOut = (zoomPercentages?: number) => {
		documentViewer.zoomTo(documentViewer.getZoomLevel() + 0.25);
	};

	const zoomIn = () => {
		documentViewer.zoomTo(documentViewer.getZoomLevel() - 0.25);
	};

	const setCustomZoomLevel = (zoomPercentages: number) => {
		documentViewer.zoomTo(zoomPercentages);
	};

	const startEditingContent = () => {
		const contentEditTool = documentViewer.getTool(
			documentInstance.Core.Tools.ToolNames.CONTENT_EDIT
		);
		documentViewer.setToolMode(contentEditTool);
	};

	const createRectangle = () => {
		documentViewer.setToolMode(
			documentViewer.getTool(documentInstance.Core.Tools.ToolNames.RECTANGLE)
		);
	};

	const selectTool = () => {
		documentViewer.setToolMode(
			documentViewer.getTool(documentInstance.Core.Tools.ToolNames.EDIT)
		);
	};

	const createRedaction = () => {
		documentViewer.setToolMode(
			documentViewer.getTool(documentInstance.Core.Tools.ToolNames.REDACTION)
		);
	};

	const applyRedactions = async () => {
		const annotationManager = documentViewer.getAnnotationManager();
		annotationManager.enableRedaction();
		await annotationManager.applyRedactions();
	};

	const richTextEditorChangeHandler = (value: any) => {
		setEditBoxCurrentValue(value);
	};

	const applyEditModal = () => {
		documentInstance.Core.ContentEdit.updateDocumentContent(
			editBoxAnnotation,
			editBoxCurrentValue
		);

		setEditBoxAnnotation(null);
		setEditBoxCurrentValue(null);
	};

	const changeLayOutMode = (isSingle?: boolean) => {
		const LayoutMode = documentInstance.UI.LayoutMode;
		documentInstance.UI.setLayoutMode(
			isSingle ? LayoutMode.FacingContinuous : LayoutMode.Single
		);
	};

	const downloadPfd = async () => {
		await documentInstance.UI.downloadPdf({
			includeAnnotations: true,
			flatten: true
		});
	};

	const toggleFullScreen = async () => {
		await documentInstance.UI.toggleFullScreen();
	};

	const printPdf = async () => {
		await documentInstance.UI.print({
			includeAnnotations: true,
			flatten: true
		});
	};

	const editSelectedBox = async () => {
		const selectedAnnotations = documentViewer
			.getAnnotationManager()
			.getSelectedAnnotations();
		const selectedAnnotation = selectedAnnotations[0];

		if (
			selectedAnnotation &&
			selectedAnnotation.isContentEditPlaceholder() &&
			selectedAnnotation.getContentEditType() ===
			documentInstance.Core.ContentEdit.Types.TEXT
		) {
			const content =
				await documentInstance.Core.ContentEdit.getDocumentContent(
					selectedAnnotation
				);
			setEditBoxAnnotation(selectedAnnotation);
			setEditBoxCurrentValue(content);
		} else {
			alert('Text edit box is not selected');
		}
	};

	const onTabChange = (currentKey: string) => {
		setActiveKey(currentKey);
	};
	const openRightSider = () => {
		setCollapsed(false);
		(document.getElementById('mySidebar') as HTMLInputElement).style.width =
			'20.8%';
	};
	const closeRightSider = () => {
		setCollapsed(true);
		(document.getElementById('mySidebar') as HTMLInputElement).style.width =
			'0px';
	};
	const iconClicked = (e: any) => {
		setRightSiderClicks(e.target.id);
	};

	const onChangeSearchInput = async (string: any) => {
		const searchPattern = string;
		const searchOptions = {
			caseSensitive: false, // match case
			wholeWord: false, // match whole words only
			wildcard: false, // allow using '*' as a wildcard value
			regex: false, // string is treated as a regular expression
			searchUp: false, // search from the end of the document upwards
			ambientString: true // return ambient string as part of the result
		};

		// if (!string) {
		// 	documentViewer.clearSearchResults();
		// 	return false;
		// }
		console.log('searchPattern ------>', searchPattern);
		documentInstance.UI.addSearchListener(searchListener);
		documentInstance.UI.searchTextFull(searchPattern, searchOptions);
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
						<FileTabBar initialPanes={initialPanes} onTabChange={onTabChange} />
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer>
							<LeftIconGroup span={7} className="pl2">
								{!collapsed ? (
									<ExpandIcon
										onClick={() => closeRightSider()}
										className="icon22"
										color="black"
									/>
								) : (
									<ExpandAltOutlined
										style={{ fontSize: '20px' }}
										onClick={() => openRightSider()}
									/>
								)}
							</LeftIconGroup>
							<RightIconGroup span={16} className="p1">
								<ChatIcon2
									id="comment"
									className="icon22"
									color={rightSiderClicks === 'comment' ? '#1379FF' : 'black'}
									onClick={(e: any) => iconClicked(e)}
								/>
								<BookmarkIcon className="icon22" color="black" />
								<UserStarIcon className="icon22" />
								<InfoIcon
									id="info"
									className="icon22"
									onClick={(e: any) => iconClicked(e)}
									color={rightSiderClicks === 'info' ? '#1379FF' : 'black'}
								/>
							</RightIconGroup>
						</RightHeaderContainer>
					</Col>

					{/* Header top right Icon tab over */}
				</HeaderContainer>
				{/* Header part Over */}

				<Row id="main-column">
					{/* Left sider start */}
					<LeftSliderContainer>
						<LeftSlider />
					</LeftSliderContainer>
					{/* Left sider over */}

					{/* Content part start */}
					<CenterColumn>
						<Row id={'tools'}>
							<ToolBar
								searchResults={searchResults}
								zoomIn={zoomIn}
								zoomOut={zoomOut}
								setCustomZoomLevel={setCustomZoomLevel}
								documentViewer={documentViewer}
								createRectangle={createRectangle}
								selectTool={selectTool}
								totalPageCount={maxCount}
								downloadPfd={downloadPfd}
								changeLayOutMode={changeLayOutMode}
								onChangeSearchInput={onChangeSearchInput}
								toggleFullScreen={toggleFullScreen}
							/>
						</Row>
						<ContentSection>
							<WebviewerSection ref={viewer} />
						</ContentSection>
					</CenterColumn>
					{/* Content part over */}
					{/* right sider Start */}
					<RightCollapsibleSider id="mySidebar" className="pt1">
						{rightSiderClicks === 'info' ? (
							<>
								<Row>
									<OwnerInfoContainer>
										{!collapsed && <OwnerInfo fileListing={false} />}
									</OwnerInfoContainer>
								</Row>
								<Row className="justify-start height-full">
									{!collapsed && <MemberList />}
								</Row>
							</>
						) : (
							<div className="px1 ">
								<Comment />
							</div>
						)}
					</RightCollapsibleSider>
					{/* right sider Over */}
				</Row>
			</MainContainer>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	// isLoading: state.getIn(['global', 'globalLoading'])
	isLoading: state.global.globalLoading
});
export default connect(mapStateToProps)(Home);