/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
	SearchOutlined,
	LeftOutlined,
	RightOutlined,
	PlusCircleOutlined,
	MinusCircleOutlined,
	DownOutlined
} from '@ant-design/icons';
import {
	IconBG,
	IncDecContainer,
	PaginationContainer,
	SelectContainer,
	ToolBarContainer
} from './ToolBar.style';
import {
	CallIcon,
	ChatIcon2,
	CopyIcon,
	CursorTextCopyMove,
	DownloadButton,
	HandMoveIcon,
	PageIcon,
	PrintIcon,
	ShareIcon,
	SizeChangeIcon,
	VideoIcon
} from '../../../../assets';
import { Col, Tooltip, Select } from 'antd';
import { Popover } from 'react-tiny-popover';

import { SearchButtonFilled } from '../../../../styles/Layout.style';
import MemberListPopup from './components/MemberListPopup/MemberListPopup';
const { Option } = Select;

interface IToolBarProps {
	zoomIn: any;
	zoomOut: any;
	documentViewer: any;
	setCustomZoomLevel: any;
	createRectangle: any;
	selectTool: any;
	totalPageCount: number;
	downloadPfd: any;
	changeLayOutMode: any;
	onChangeSearchInput: any;
	toggleFullScreen: any;
	searchResults: any;
	printPdf: any;
	exportAnnotation: any;
}

const ToolBar = ({
	zoomIn,
	zoomOut,
	searchResults,
	documentViewer,
	createRectangle,
	selectTool,
	setCustomZoomLevel,
	totalPageCount,
	downloadPfd,
	changeLayOutMode,
	onChangeSearchInput,
	toggleFullScreen,
	printPdf,
	exportAnnotation
}: IToolBarProps) => {
	const [pageCount, setPageCount] = useState(1);
	const [maxCount, setMaxCount] = useState(totalPageCount);
	const [zoomLevel, setZoomLevel] = useState(100);
	const [isSingleLayout, setIsSingleLayout] = useState(false);
	const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
	const [currentSearchResultOn, setCurrentSearchResultOn] = useState<number>(0);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [isHandTool, setIsHandTool] = useState(true);

	const IncDecContainerProps = {
		padding: '7px'
	};

	useEffect(() => {
		console.log('totalPageCount -------->', totalPageCount);
		setMaxCount(totalPageCount);
		// setPageCount(documentViewer.getCurrentPage());
	}, [totalPageCount]);

	const decrementPageCount = () => {
		if (pageCount > 1) {
			setPageCount(prev => prev - 1);
			documentViewer.setCurrentPage(pageCount - 1);
		}
	};
	const incrementPageCount = () => {
		if (pageCount <= maxCount) {
			setPageCount(prev => prev + 1);
			documentViewer.setCurrentPage(pageCount + 1);
		} else {
			setPageCount(maxCount);
		}
	};
	const onChangeZoomLevel = (value: any) => {
		setZoomLevel(value);
		setCustomZoomLevel(value / 100);
	};

	const refreshZoomLevel = () => {
		const newZoomLevel = documentViewer.getZoomLevel() * 100;
		console.log('newZoomLevel==>', newZoomLevel);
		setZoomLevel(newZoomLevel);
	};

	const onClickChangeLayout = () => {
		setIsSingleLayout(!isSingleLayout);
		changeLayOutMode(isSingleLayout);
	};
	const handleSearchChange = (e: any) => {
		onChangeSearchInput(e.target.value);
		setSearchValue(e.target.value);
		// if (e.target.value) {
		setIsPopoverOpen(true);
		// } else {
		// 	setIsPopoverOpen(false);
		// }
	};

	const jumpToSearchResult = (jumpTo: number) => {
		if (currentSearchResultOn <= searchResults.length - 1) {
			setCurrentSearchResultOn(currentSearchResultOn + jumpTo);
			const pageNumber = searchResults[currentSearchResultOn].page_num;
			documentViewer.setCurrentPage(pageNumber);
		}
	};

	const options = () => {
		return (
			<PaginationContainer
				style={{ background: '#fff' }}
				className="box-shadow flex justify-between items-center"
			>
				<LeftOutlined
					{...IncDecContainerProps}
					disabled={pageCount === 1}
					onClick={() => jumpToSearchResult(-1)}
				/>
				<>
					<span style={{ paddingLeft: '7px' }}>
						{searchResults.length
							? currentSearchResultOn + 1
							: currentSearchResultOn}
					</span>
					<span>of</span>
					<span style={{ paddingLeft: '7px' }}>{searchResults.length}</span>
				</>
				<RightOutlined
					{...IncDecContainerProps}
					onClick={() => jumpToSearchResult(1)}
					disabled={searchResults.length === currentSearchResultOn}
				/>
			</PaginationContainer>
		);
	};

	return (
		<ToolBarContainer className="flex items-center justify-between">
			{/* Search Button */}

			<Col>
				<Popover
					content={options}
					isOpen={isPopoverOpen}
					containerStyle={{ top: '14%', left: '5%' }}
					onClickOutside={() => setIsPopoverOpen(false)}
				>
					<SearchButtonFilled
						value={searchValue}
						onChange={handleSearchChange}
						style={{ width: 150 }}
						placeholder="Search"
						prefix={<SearchOutlined />}
					/>
				</Popover>
			</Col>

			{/* Members Avatar */}

			<Col className="pl2	pointer">
				<MemberListPopup />
			</Col>
			<PageIcon alt="page" onClick={onClickChangeLayout} className="icon22" />
			<Col>
				<IncDecContainer>
					<LeftOutlined
						disabled={pageCount === 1}
						onClick={() => decrementPageCount()}
						{...IncDecContainerProps}
					/>
					<>
						<input
							className="border-none"
							value={pageCount}
							onChange={e => setPageCount(parseInt(e.target.value))}
							style={{ width: '25px' }}
						/>
						<span>of</span>
						<span style={{ paddingLeft: '7px' }}>{maxCount}</span>
					</>
					<RightOutlined
						{...IncDecContainerProps}
						disabled={pageCount === maxCount}
						onClick={() => incrementPageCount()}
					/>
				</IncDecContainer>
			</Col>
			<Col>
				<IncDecContainer className="px2">
					<MinusCircleOutlined
						disabled={pageCount === 1}
						onClick={() => {
							zoomIn();
							refreshZoomLevel();
						}}
						{...IncDecContainerProps}
					/>
					<>
						<SelectContainer
							bordered={false}
							disabled={false}
							className={'flex items-center'}
							value={`${Math.floor(zoomLevel)}%`}
							onChange={value => onChangeZoomLevel(value)}
							suffixIcon={<DownOutlined style={{ color: 'black' }} />}
						>
							<Option value={100}>100%</Option>
							<Option value={125}>125%</Option>
							<Option value={150}>150%</Option>
							<Option value={175}>175%</Option>
						</SelectContainer>
					</>
					<PlusCircleOutlined
						// onClick={() => incrementPageCount()}
						disabled={pageCount === maxCount}
						onClick={() => {
							zoomOut();
							refreshZoomLevel();
						}}
						{...IncDecContainerProps}
					/>
				</IncDecContainer>
			</Col>

			{isHandTool ? (
				<Tooltip placement="bottom" title={`HandTool`}>
					<HandMoveIcon
						onClick={() => {
							setIsHandTool(!isHandTool);
							createRectangle();
						}}
						alt="move"
						className="icon22"
					/>
				</Tooltip>
			) : (
				<Tooltip placement="bottom" title={`SelectTool`}>
					<ShareIcon
						onClick={() => {
							setIsHandTool(!isHandTool);
							selectTool();
						}}
						alt="select"
						className="icon22"
					/>
				</Tooltip>
			)}
			<VideoIcon alt="video" className="icon22" />
			<CallIcon
				alt="call"
				className="icon22"
				onClick={() => exportAnnotation()}
			/>
			<SizeChangeIcon
				onClick={() => toggleFullScreen()}
				alt="size"
				className="icon22"
			/>
			<ShareIcon alt="share" className="icon22" />
			<CopyIcon alt="copy" className="icon22" />
			<DownloadButton
				alt="download"
				className="icon22"
				onClick={() => downloadPfd()}
			/>
			<PrintIcon alt="print" className="icon22" onClick={() => printPdf()} />

			<IconBG className="flex items-center">
				<ChatIcon2
					color="white"
					// onClick={() => downloadPfd()}
					alt="copy"
					className="icon22"
				/>
			</IconBG>
			<IconBG className="flex items-center">
				<CursorTextCopyMove
					// onClick={() => downloadPfd()}
					alt="copy"
					className="icon22"
				/>
			</IconBG>
		</ToolBarContainer>
	);
};

export default ToolBar;
