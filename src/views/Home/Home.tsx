import React, { useEffect, useState, useRef } from 'react';
import LeftSlider from '../../components/LeftSlider/LeftSlider';
import { ContentSection, RightCollapsibleSider, WebviewerSection } from './Home.style';

import WebViewer from '@pdftron/webviewer';

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

declare global {
	interface Window {
		Core: any;
	}
}

const Home = () => {
	const viewer: any = useRef(null);
	const scrollView = useRef(null);
	const searchTerm = useRef(null);

	const [maxCount, setMaxCount] = useState(10);
	const [activeKey, setActiveKey] = useState('1');
	const [collapsed, setCollapsed] = useState(false);

	const searchContainerRef = useRef(null);

	const [documentViewer, setDocumentViewer] = useState<any>(null);
	const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
	const [annotationManager, setAnnotationManager] = useState(null);
	const [searchContainerOpen, setSearchContainerOpen] = useState(false);

	const [editBoxAnnotation, setEditBoxAnnotation] = useState(null);
	const [editBoxCurrentValue, setEditBoxCurrentValue] = useState(null);

	useEffect(() => {
		console.log('🚀 ~ file: Home.tsx ~ line 36 ~ Home ~ collapsed', collapsed);
	}, [collapsed]);
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
	const loadPdfDocumentByPath = (documentPath: string) => {
		WebViewer({
			path: '/webviewer/lib',
			initialDoc: documentPath,
			fullAPI: true,
			disabledElements: [
				'header',
			]
		}, viewer.current,
		).then(async (instance) => {
			// const { documentViewer, annotationManager, Annotations, PDFNet } = instance.Core;

			const Core = instance.Core;
			// Core.setWorkerPath('/webviewer');
			Core.enableFullPDF();


			const documentViewer = new Core.DocumentViewer();
			documentViewer.setScrollViewElement(scrollView.current!);
			documentViewer.setViewerElement(viewer.current);
			documentViewer.setOptions({ enableAnnotations: true });
			setDocumentViewer(Core.documentViewer);
			// documentViewer.loadDocument(documentPath);


			documentViewer.addEventListener('documentLoaded', () => {
				setIsDocumentLoaded(true);
				console.log('document loaded');
				// setMaxCount(documentViewer.getPageCount());
			});
		})
	}

	const zoomOut = (zoomPercentages?: number) => {
		documentViewer.zoomTo(documentViewer.getZoomLevel() - 0.25);
	};

	const zoomIn = () => {
		documentViewer.zoomTo(documentViewer.getZoomLevel() + 0.25);
	};

	const setCustomZoomLevel = (zoomPercentages: number) => {
		documentViewer.zoomTo(zoomPercentages);
	}

	const startEditingContent = () => {
		const contentEditTool = documentViewer.getTool(window.Core.Tools.ToolNames.CONTENT_EDIT);
		documentViewer.setToolMode(contentEditTool);
	};

	const createRectangle = () => {
		documentViewer.setToolMode(documentViewer.getTool(window.Core.Tools.ToolNames.RECTANGLE));
	};

	const selectTool = () => {
		documentViewer.setToolMode(documentViewer.getTool(window.Core.Tools.ToolNames.EDIT));
	};

	const createRedaction = () => {
		documentViewer.setToolMode(documentViewer.getTool(window.Core.Tools.ToolNames.REDACTION));
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
		window.Core.ContentEdit.updateDocumentContent(editBoxAnnotation, editBoxCurrentValue);

		setEditBoxAnnotation(null);
		setEditBoxCurrentValue(null);
	};

	const editSelectedBox = async () => {
		const selectedAnnotations = documentViewer.getAnnotationManager().getSelectedAnnotations();
		const selectedAnnotation = selectedAnnotations[0];

		if (selectedAnnotation &&
			selectedAnnotation.isContentEditPlaceholder() &&
			selectedAnnotation.getContentEditType() === window.Core.ContentEdit.Types.TEXT) {
			const content = await window.Core.ContentEdit.getDocumentContent(selectedAnnotation);
			setEditBoxAnnotation(selectedAnnotation);
			setEditBoxCurrentValue(content);
		} else {
			alert('Text edit box is not selected');
		}
	};
	useEffect(() => {
		loadPdfDocumentByPath('/files/PDFTRON_about.pdf')
	}, []);

	const onTabChange = (currentKey: string) => {
		setActiveKey(currentKey);
	};
	const openRightSider = () => {
		setCollapsed(false);
		(document.getElementById('mySidebar') as HTMLInputElement).style.width = '320px';
	};
	const closeRightSider = () => {
		setCollapsed(true);
		(document.getElementById('mySidebar') as HTMLInputElement).style.width = '0px';
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
							<LeftIconGroup span={7}>
								{!collapsed && (
									<img
										src={ExpandIcon}
										onClick={() => closeRightSider()}
										alt="expand"
										className="icon22"
									/>
								)}
							</LeftIconGroup>
							<RightIconGroup span={16}>
								<img src={ChatIcon2} alt="chat" className="icon22" />
								<img src={BookmarkIcon} alt="bookmark" className="icon22" />
								<img src={UserStarIcon} alt="userStar" className="icon22" />

								<img
									src={InfoIcon}
									onClick={() => openRightSider()}
									alt="Info"
									className="icon22"
								/>
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
					<CenterColumn>
						<Row>
							<ToolBar
								zoomIn={zoomIn}
								zoomOut={zoomOut}
								setCustomZoomLevel={setCustomZoomLevel}
								documentViewer={documentViewer}
								createRectangle={createRectangle}
								selectTool={selectTool}
								totalPageCount={maxCount}
							/>
						</Row>

						<WebviewerSection ref={viewer} />
					</CenterColumn>
					{/* Content part over */}
					{/* right sider Start */}
					{/* span={collapsed ? 0 : 5} */}
					<RightCollapsibleSider id="mySidebar" className="pt1">
						<Row>
							<OwnerInfoContainer>
								{!collapsed && <OwnerInfo fileListing={false} />}
							</OwnerInfoContainer>
						</Row>
						<Row className="justify-start">{!collapsed && <MemberList />}</Row>
					</RightCollapsibleSider>
					{/* right sider Over */}
				</Row>
			</MainContainer>
		</>
	);
};
export default Home;
