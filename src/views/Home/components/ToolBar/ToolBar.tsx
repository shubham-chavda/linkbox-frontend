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
	IncDecContainer,
	SelectContainer,
	ToolBarContainer
} from './ToolBar.style';
import {
	CallIcon,
	CopyIcon,
	HandMoveIcon,
	PageIcon,
	ShareIcon,
	SizeChangeIcon,
	VideoIcon
} from '../../../../assets';
import { Col, List, Typography } from 'antd';
import { SearchButtonFilled } from '../../../../styles/Layout.style';
import MemberListPopup from './components/MemberListPopup/MemberListPopup';
// import Item from 'antd/lib/list/Item';

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
	}

	return (
		<ToolBarContainer>
			{/* Search Button */}

			<Col>
				<SearchButtonFilled
					style={{ width: 241 }}
					placeholder="Search"
					onChange={(e) => onChangeSearchInput(e.target.value)}
					prefix={<SearchOutlined />}
				/>
				{/* 
					ambientStr: "UX, test functionality with the types of documents your users will"
					ambient_str: "UX, test functionality with the types of documents your users will"
					pageNum: 6
					page_num: 6
					quads: [e]
					resultCode: 2
					resultStr: "test"
					resultStrEnd: 8
					resultStrStart: 4
					result_str: "test"
					result_str_end: 8
					result_str_start: 4
				*/}
				{searchResults.length &&
					<List
						bordered
						dataSource={searchResults}
						renderItem={(item: any, index: any) => (
							<div
								key={index}
								onClick={() => {
									documentViewer.setCurrentPage(item.page_num);
								}}
							>
								<Typography.Text>{item.result_str}</Typography.Text>
								<Typography.Text>{item.pageNum}</Typography.Text>
								<Typography.Text>{item.ambient_str}</Typography.Text>
							</div>
						)}
					/>
				}
			</Col>

			{/* Members Avatar */}

			<Col className="pl2	pointer">
				<MemberListPopup />
			</Col>
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

			<img src={PageIcon} onClick={onClickChangeLayout} alt="page" className="icon22" />
			<img onClick={() => createRectangle()} src={HandMoveIcon} alt="move" className="icon22" />
			<img
				onClick={() => createRectangle()}
				src={HandMoveIcon}
				alt="move"
				className="icon22"
			/>
			<img src={VideoIcon} alt="video" className="icon22" />
			<img src={CallIcon} alt="call" className="icon22" />
			<img src={SizeChangeIcon} onClick={() => toggleFullScreen()} alt="size" className="icon22" />
			<img src={ShareIcon} alt="share" className="icon22" />
			<img
				src={CopyIcon}
				onClick={() => downloadPfd()}
				alt="copy"
				className="icon22"
			/>
		</ToolBarContainer>
	);
};

export default ToolBar;
