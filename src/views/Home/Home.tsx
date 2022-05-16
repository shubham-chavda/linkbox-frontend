/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
	getDocumentInfo,
	setTabPanes
} from '../../store/Documents/DocumentsReducer';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import history from '../../history';
const { DOC_URL } = process.env;

declare global {
	interface Window {
		Core: any;
	}
}

const Home = (props: any) => {
	const { tabPanes } = props;

	const dispatch = useAppDispatch();
	const { id: documentID } = useParams();

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

	const [maxCount, setMaxCount] = useState(1);
	const [activeKey, setActiveKey] = useState('');
	const [collapsed, setCollapsed] = useState(false);

	const [documentViewer, setDocumentViewer] = useState<any>(null);
	const [annotationManager, setAnnotationManager] = useState<any>(null);
	const [annotations, setAnnotations] = useState<any>(null);

	const [searchResults, setSearchResults] = useState<any>([]);

	const [commentOpen, setCommentOpen] = useState(false);

	const [editBoxAnnotation, setEditBoxAnnotation] = useState(null);
	const [editBoxCurrentValue, setEditBoxCurrentValue] = useState(null);
	const [updatedAnnotation, setUpdatedAnnotation] = useState<any>(null);
	const [documentInstance, setDocumentInstance] = useState<any>(null);
	// const [initialPanes, setInitialPanes] = useState([
	// 	{
	// 		title: selectedDocumentInfo ? selectedDocumentInfo.name : null,
	// 		content: selectedDocumentInfo?.docUrl,
	// 		key: '1'
	// 	}
	// ]);
	useEffect(() => {
		console.log(
			'🚀 ~ file: Home.tsx ~ line 108 ~ Home ~ documentInstance',
			documentInstance
		);
		if (documentInstance) getTabsEvent();
	}, [documentInstance]);
	useEffect(() => {
		dispatch(getDocumentInfo({ uuid: documentID }));
	}, [documentID]);
	// useEffect(() => {
	// 	const docUrlList = tabPanes.map((tabPane: any) => {
	// 		return `${DOC_URL}document/fetch/${tabPane.content}`;
	// 	});
	// 	console.log("docUrlList ------->", docUrlList);
	// 	loadPdfDocumentByPath(docUrlList);
	// 	// if (docUrlList.length) addTabEvent(docUrlList);
	// }, [tabPanes]);

	useEffect(() => {
		if (selectedDocumentInfo) {
			// loadPdfDocumentByPath(
			// 	`${DOC_URL}document/fetch/${selectedDocumentInfo?.docUrl.replace(
			// 		'upload/doc/',
			// 		''
			// 	)}`
			// );
			// dispatch(
			// 	setTabPanes([
			// 		{
			// 			title: selectedDocumentInfo
			// 				? selectedDocumentInfo.name
			// 				: 'PdfTron default',
			// 			content: selectedDocumentInfo?.docUrl,
			// 			key: selectedDocumentInfo?.uuid
			// 		}
			// 	])
			// );
			loadPdfDocumentByPath(
				// 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
				`${DOC_URL}document/fetch/${selectedDocumentInfo?.docUrl}`
			);
			// 'http://localhost:8080/document-detail/0ffbfa0a-6e32-4729-a745-bdd42bd55fb1'
			// dispatch(
			// 	setTabPanes([
			// 		{
			// 			title: selectedDocumentInfo
			// 				? selectedDocumentInfo.name
			// 				: 'PdfTron default',
			// 			content: selectedDocumentInfo?.docUrl,
			// 			key: selectedDocumentInfo?.uuid
			// 		}
			// 	])
			// );
		}
		// else {
		// 	loadPdfDocumentByPath(
		// 		'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
		// 	);
		// }
	}, [selectedDocumentInfo]);

	const loadPdfDocumentByPath = (documentPath: any) => {
		WebViewer(
			{
				path: '/webviewer/lib/',
				fullAPI: true,
				extension: ['pdf'],
				disabledElements: [
					'header',
					'toolsHeader',
					'searchPanel',
					'contextMenuPopup'
					// 'notesPanel',
				]
				// css: '/test.css'
			},
			viewer.current
		).then(async (instance) => {
			const { Annotations, annotationManager, documentViewer } = instance.Core;
			instance.UI.loadDocument(documentPath);
			const Core = instance.Core;

			documentViewer.addEventListener('documentLoaded', async () => {
				console.log('documentLoaded -------->');

				documentViewer.addEventListener(
					'textSelected',
					(quads, selectedText, pageNumber) => {
						console.log(
							'quads, selectedText, pageNumber ---->',
							quads,
							selectedText,
							pageNumber
						);
						if (selectedText && quads.length) {
							// quads
							const highlight = new Annotations.TextMarkupAnnotation();
							highlight.PageNumber = pageNumber;
							highlight.X = quads[0].x1;
							highlight.Y = quads[0].y1;
							highlight.Height = quads[0].x1 - quads[0].x2;
							highlight.Width = quads[0].y1 - quads[0].y2;
							highlight.StrokeColor = new Annotations.Color(255, 255, 0);
							// highlight.Quads = [quads];
							console.log('highlight --------->', highlight);

							annotationManager.addAnnotation(highlight);
							annotationManager.drawAnnotations(pageNumber);
							// annotationManager.setNoteContents(quads[0], "new comment");
						}
					}
				);
				const quads = documentViewer.getSelectedTextQuads(
					documentViewer.getCurrentPage()
				);
				console.log('quads ---------->', quads);
				const tabsList = await instance.UI.TabManager.getActiveTab();
				console.log('tabsList ---------->', tabsList);
			});

			annotationManager.addEventListener(
				'annotationChanged',
				(annotations, action) => {
					setUpdatedAnnotation(annotations);
					console.log('annotations ----->', annotations);
					console.log('action ----->', action);
					if (action === 'add') {
						console.log('inside add comment');
						annotationManager.setNoteContents(annotations[0], 'new comment');
					}
				}
			);

			// Core.enableFullPDF();
			// documentViewer.setOptions({ enableAnnotations: true });
			setDocumentViewer(documentViewer);
			// setDocumentInstance(instance);
			setAnnotationManager(annotationManager);
			// setAnnotations(Annotations);
			// const LayoutMode = instance.UI.LayoutMode;
			// instance.UI.setLayoutMode(LayoutMode.FacingContinuous);

			// annotationManager.setNoteContents(annotations, text);

			// https://lbdocapi.dev.brainvire.net/collab

			// ws://lbdocapi.dev.brainvire.net/collab/subscribe
			// const client = new CollabClient({
			// 	instance,
			// 	logLevel: CollabClient.LogLevels.DEBUG,
			// 	filterLogsByTag: CollabClient.LogTags.AUTH,
			// 	url: 'https://lbnotifapi.dev.brainvire.net',
			// 	subscriptionUrl: 'wss://lbnotifapi.dev.brainvire.net/subscribe'
			// });
			// let session = await client.getUserSession();
			// console.log('session --->', session);
			// if (!session) {
			// 	const token = window.localStorage.getItem('token');
			// 	// console.log("client --------->", client);

			// 	console.log('token ------>', token);

			// 	session = await client.loginWithToken(token || '');
			// 	console.log('new session ------->', session);
			// 	// await client.setContext({ userId: session.id, createdBy: session.id });
			// 	if (!session) {
			// 		notification.error({
			// 			message: 'Login is failed Please refresh page....'
			// 		});
			// 		return false;
			// 	}
			// 	await client.setCustomHeaders({
			// 		authorization: token || ''
			// 	});
			// }

			// const doc = await session.getDocument(selectedDocumentInfo.id);
			// console.log('doc ------->', doc);
			// await doc.view(documentPath);
			// const totalPageCount = documentViewer.getPageCount();
			// console.log("totalPageCount -------->", totalPageCount);
			// setMaxCount(totalPageCount);

			// if (!doc.isAuthor) {
			// 	const canJoin = await doc.canJoin();
			// 	console.log('canJoin ---> ', canJoin);
			// 	if (canJoin) doc.join();
			// }

			// console.log('isAuthor', doc.isAuthor);
			// console.log('isMember', doc.isMember());
			// // await doc.inviteUsers([responseLogin.id])
			// client.EventManager.subscribe('annotationAdded', (annotation) => {
			// 	console.log('annotation ---------->', annotation);
			// 	setUpdatedAnnotation(updatedAnnotation);
			// 	annotation.subscribe('onChange', (updatedAnnotation) => {
			// 		console.log('annotation changed', updatedAnnotation);
			// 	});
			// });

			// client.EventManager.subscribe('annotationChanged', (annotation) => {
			// 	console.log('annotation changed ---------->', annotation);
			// });

			// const style = instance.UI.iframeWindow.document.documentElement.style;
			// style.setProperty(`--document-background-color`, 'white');
			// const a = instance.UI.addEventListener('TAB_ADDED', (tab) => {')
			// const a = instance.UI.TabManager.addEventListener()

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

	const zoomOut = () => {
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
			window.Core.Tools.ToolNames.CONTENT_EDIT
		);
		documentViewer.setToolMode(contentEditTool);
	};

	const createRectangle = () => {
		documentInstance.setToolMode('Pan');
	};
	const selectTool = () => {
		documentInstance.setToolMode('AnnotationEdit');
	};
	const createRedaction = () => {
		documentViewer.setToolMode(
			documentViewer.getTool(window.Core.Tools.ToolNames.REDACTION)
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
		window.Core.ContentEdit.updateDocumentContent(
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

	const exportAnnotation = () => {
		annotationManager
			.exportAnnotations({ links: false, widgets: false })
			.then((xfdfString: any) => {
				console.log('xfdfstring ---------->', xfdfString);
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
				window.Core.ContentEdit.Types.TEXT
		) {
			const content = await window.Core.ContentEdit.getDocumentContent(
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
		// history.navigate?.(`/document-detail/${currentKey}`);
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

	const openChatView = () => {
		setRightSiderClicks('comment');
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

		documentInstance.UI.addSearchListener(searchListener);
		documentInstance.UI.searchTextFull(searchPattern, searchOptions);
	};
	const getTabsEvent = () => {
		console.log('🚀  getTabsEvent', getTabsEvent);
		const tabs = documentInstance.UI.TabManager.getTabs();
		console.log('🚀 ~ file: Home.tsx ~ line 434 ~ getTabsEvent ~ tabs', tabs);
	};
	const addTabEvent = (DocUrlList: string) => {
		console.log(
			'🚀 ~ file: Home.tsx ~ line 423 ~ addTabEvent ~ DocURL',
			DocUrlList,
			documentInstance
		);
		const options = {
			extension: 'pdf',
			filename: 'file1.pdf', // Used as the name of the tab
			load: true, // Defaults to true
			saveCurrent: false // Defaults to true
		};
		documentInstance.UI.TabManager.addTab(DocUrlList, options).then(function (
			newTabId: any
		) {
			console.log('🚀🚀🚀🚀🚀', newTabId);
		});
	};
	return (
		<>
			<MainContainer>
				{/* Header part start */}
				<HeaderContainer>
					<HeaderHome
						className="height-full"
						// onClick={() => history.navigate?.('/documents')}
						span={1}
					>
						<HomeIcon alt="home" className="icon22" />
					</HeaderHome>

					{/* File Tab bar start */}

					<HeaderFileTab span={18}>
						<FileTabBar
							initialPanes={tabPanes}
							onTabChange={onTabChange}
							closable={true}
						/>
					</HeaderFileTab>

					{/* File Tab bar over */}

					{/* Header top right Icon tab start */}

					<Col span={5}>
						<RightHeaderContainer>
							<LeftIconGroup span={7} className="pl2 mb2">
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
							<RightIconGroup span={16} className="p1 mb2">
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
								printPdf={printPdf}
								exportAnnotation={exportAnnotation}
								openChatView={openChatView}
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
							<div className="px1">
								<Comment
									isOpen={commentOpen}
									annotations={annotations}
									documentViewer={documentViewer}
									updatedAnnotation={updatedAnnotation}
									annotationManager={annotationManager}
								/>
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
	tabPanes: state.documents.tabPanes
});

export default connect(mapStateToProps)(Home);
