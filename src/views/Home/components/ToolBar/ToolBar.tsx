import React, { useState } from 'react';
import {
	SearchOutlined,
	LeftOutlined,
	RightOutlined,
	PlusCircleOutlined,
	MinusCircleOutlined
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
import { Col } from 'antd';
import { SearchButtonFilled } from '../../../../styles/Layout.style';
import MemberListPopup from './components/MemberListPopup/MemberListPopup';
const ToolBar = () => {
	const [pageCount, setPageCount] = useState(1);
	const [maxCount, setMaxCount] = useState(100);
	const [zoomLevel, setZoomLevel] = useState('100');

	const IncDecContainerProps = {
		padding: '7px'
	};

	const decrementPageCount = () => {
		if (pageCount >= 1) setPageCount((prev) => prev - 1);
	};
	const incrementPageCount = () => {
		if (pageCount <= maxCount) setPageCount((prev) => prev + 1);
		else setPageCount(maxCount);
	};
	const onChangeZoomLevel = (value: string) => {
		setZoomLevel(value);
	};

	return (
		<ToolBarContainer>
			{/* Search Button */}

			<Col>
				<SearchButtonFilled
					style={{ width: 250 }}
					placeholder="Search"
					prefix={<SearchOutlined />}
				/>
			</Col>

			{/* Members Avatar */}

			<Col className="pl2	">
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
							className="border-none "
							value={pageCount}
							onChange={(e) => setPageCount(parseInt(e.target.value))}
							style={{ width: '25px' }}
						/>
						<span>of</span>
						<span style={{ paddingLeft: '7px' }}>{maxCount}</span>
					</>
					<RightOutlined
						onClick={() => incrementPageCount()}
						disabled={pageCount === maxCount}
						{...IncDecContainerProps}
					/>
				</IncDecContainer>
			</Col>
			<Col>
				<IncDecContainer>
					<MinusCircleOutlined
						disabled={pageCount === 1}
						// onClick={() => decrementPageCount()}
						{...IncDecContainerProps}
					/>
					<>
						<SelectContainer
							defaultValue="100%"
							onChange={() => onChangeZoomLevel}
						>
							<option value="100">100%</option>
							<option value="125">125%</option>
							<option value="150">150%</option>
							<option value="175">175%</option>
						</SelectContainer>
					</>
					<PlusCircleOutlined
						// onClick={() => incrementPageCount()}
						disabled={pageCount === maxCount}
						{...IncDecContainerProps}
					/>
				</IncDecContainer>
			</Col>

			<img src={PageIcon} alt="page" className="icon22" />
			<img src={HandMoveIcon} alt="move" className="icon22" />
			<img src={VideoIcon} alt="video" className="icon22" />
			<img src={CallIcon} alt="call" className="icon22" />
			<img src={SizeChangeIcon} alt="size" className="icon22" />
			<img src={ShareIcon} alt="share" className="icon22" />
			<img src={CopyIcon} alt="copy" className="icon22" />
		</ToolBarContainer>
	);
};

export default ToolBar;
