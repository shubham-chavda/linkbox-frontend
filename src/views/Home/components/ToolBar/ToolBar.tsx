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
	ChatIcon2,
	CursorTextCopyMove,
	HandMoveIcon,
	PageIcon
} from '../../../../assets';
import { Col } from 'antd';
import { SearchButtonFilled } from '../../../../styles/Layout.style';
import MemberListPopup from './components/MemberListPopup/MemberListPopup';
import { Popover } from 'react-tiny-popover';

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
	toggleFullScreen
}: IToolBarProps) => {
	const [pageCount, setPageCount] = useState(1);
	const [maxCount, setMaxCount] = useState(totalPageCount);
	const [zoomLevel, setZoomLevel] = useState(100);
	const [isSingleLayout, setIsSingleLayout] = useState(false);
	const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
	const [currentSearchResultOn, setCurrentSearchResultOn] = useState<number>(0);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
			setPageCount((prev) => prev - 1);
			documentViewer.setCurrentPage(pageCount - 1);
		}
	};
	const incrementPageCount = () => {
		if (pageCount <= maxCount) {
			setPageCount((prev) => prev + 1);
			documentViewer.setCurrentPage(pageCount + 1);
		} else {
			setPageCount(maxCount);
		}
	};
	const onChangeZoomLevel = (value: string) => {
		console.log('documentViewer.getZoomLevel() ========>', value);
		// setZoomLevel(+value);
		setCustomZoomLevel(value);
		// setZoomLevel(documentViewer.getZoomLevel() * 100);
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
		setIsPopoverOpen(true);
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
				className="box-shadow flex justify-between items-center"
				style={{ background: '#fff' }}
			>
				<LeftOutlined
					disabled={pageCount === 1}
					onClick={() => jumpToSearchResult(-1)}
					{...IncDecContainerProps}
				/>
				<>
					<span style={{ paddingLeft: '7px' }}>{currentSearchResultOn}</span>
					<span>of</span>
					<span style={{ paddingLeft: '7px' }}>{searchResults.length}</span>
				</>
				<RightOutlined
					{...IncDecContainerProps}
					disabled={searchResults.length === currentSearchResultOn}
					onClick={() => jumpToSearchResult(1)}
				/>
			</PaginationContainer>
		);
	};

	return (
		<ToolBarContainer className="flex items-center justify-between">
			{/* Search Button */}

			<Col>
				{/* <SearchButtonDropDown
					showSearch
					value={searchValue}
					showArrow={false}
					bordered={false}
					style={{ width: 241 }}
					placeholder="Search"
					filterOption={false}
					onSearch={onChangeSearchInput}
					onChange={(e) => handleSearchChange(e)}
					dropdownMatchSelectWidth={false}
					// prefix={<SearchOutlined />}
					dropdownStyle={{
						borderRadius: '12px',
						width: '400px'
					}}
				>
					{options()}
				</SearchButtonDropDown> */}
				<Popover
					isOpen={isPopoverOpen}
					containerStyle={{ top: '14%', left: '5%' }}
					// positions={['bottom']}
					onClickOutside={() => setIsPopoverOpen(false)}
					content={options}
				>
					<SearchButtonFilled
						value={searchValue}
						onChange={handleSearchChange}
						style={{ width: 450 }}
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
							onChange={(e) => setPageCount(parseInt(e.target.value))}
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
							className="flex items-center"
							bordered={false}
							disabled={false}
							suffixIcon={<DownOutlined style={{ color: 'black' }} />}
							value={`${Math.floor(zoomLevel)}%`}
							onChange={() => onChangeZoomLevel}
						>
							<option value={100}>100%</option>
							<option value={125}>125%</option>
							<option value={150}>150%</option>
							<option value={175}>175%</option>
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

			<HandMoveIcon
				onClick={() => selectTool()}
				alt="move"
				className="icon22"
			/>
			{/* <VideoIcon alt="video" className="icon22" />
			<CallIcon alt="call" className="icon22" />
			<SizeChangeIcon
				onClick={() => toggleFullScreen()}
				alt="size"
				className="icon22"
			/>
			<ShareIcon alt="share" className="icon22" />*/}
			<IconBG className="flex items-center">
				<ChatIcon2
					color="white"
					onClick={() => downloadPfd()}
					alt="copy"
					className="icon22"
				/>
			</IconBG>
			<IconBG className="flex items-center">
				<CursorTextCopyMove
					onClick={() => downloadPfd()}
					alt="copy"
					className="icon22"
				/>
			</IconBG>
		</ToolBarContainer>
	);
};

export default ToolBar;
