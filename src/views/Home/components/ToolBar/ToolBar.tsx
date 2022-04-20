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
	SearchButton,
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
import { Avatar, Col } from 'antd';

const ToolBar = () => {
	const [pageCount, setPageCount] = useState(1);
	const [maxCount, setMaxCount] = useState(100);
	const [zoomLevel, setZoomLevel] = useState('100');

	const IncDecContainerProps = {
		fontSize: '14px',
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
				<SearchButton
					style={{ width: 250 }}
					placeholder="Search"
					prefix={<SearchOutlined />}
				/>
			</Col>

			{/* Members Avatar */}

			<Col style={{ paddingLeft: '20px' }}>
				<Avatar.Group
					maxCount={1}
					maxPopoverTrigger="focus"
					size="large"
					maxStyle={{
						color: '#fff',
						backgroundColor: '#25CA69',
						cursor: 'pointer',
						borderLeft: 'none'
					}}
				>
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					<Avatar src="https://joeschmoe.io/api/v1/random" />
					<Avatar src="https://joeschmoe.io/api/v1/random" />
					<Avatar src="https://joeschmoe.io/api/v1/random" />
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				</Avatar.Group>
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
							value={pageCount}
							onChange={(e) => setPageCount(parseInt(e.target.value))}
							style={{ width: '25px', fontSize: '14px', border: 'none' }}
						/>
						<span style={{ fontSize: '14px' }}>of</span>
						<span style={{ fontSize: '14px', paddingLeft: '7px' }}>
							{maxCount}
						</span>
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
