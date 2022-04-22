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
import { Button, Col, Row } from 'antd';
import AvatarGroup from '@atlaskit/avatar-group';
import PopoverComponent from '../../../../components/PopupMenu/PopupMenu';

interface IToolBarProps {
	zoomIn: any;
	zoomOut: any;
	documentViewer: any;
	setCustomZoomLevel: any;
	createRectangle: any;
	selectTool: any
}

const ToolBar = ({
	zoomIn,
	zoomOut,
	documentViewer,
	setCustomZoomLevel,
	createRectangle,
	selectTool,
}: IToolBarProps) => {
	const [pageCount, setPageCount] = useState(1);
	const [maxCount, setMaxCount] = useState(100);
	const [zoomLevel, setZoomLevel] = useState(100);

	const IncDecContainerProps = {
		padding: '7px'
	};
	const data = [...Array(10)].map((_, i) => ({
		email: `johnDoe@gmail.com ${i}`,
		key: `johnDoe@gmail.com ${i}`,
		name: `johnDoe ${i}`,
		href: '#',
		src: 'https://joeschmoe.io/api/v1/random'
	}));
	const content = (
		<div>
			<div>Send a Message</div>
			<div>Video call</div>
			<div>Audio call</div>
			<div>Report inappropriate actions</div>
			<div>Block User</div>
		</div>
	);

	const decrementPageCount = () => {
		if (pageCount >= 1) setPageCount((prev) => prev - 1);
	};
	const incrementPageCount = () => {
		if (pageCount <= maxCount) setPageCount((prev) => prev + 1);
		else setPageCount(maxCount);
	};
	const onChangeZoomLevel = (value: string) => {
		console.log("documentViewer.getZoomLevel() ========>", value);
		// setZoomLevel(+value);
		setCustomZoomLevel(value);
		// setZoomLevel(documentViewer.getZoomLevel() * 100);
	};

	const refreshZoomLevel = () => {
		const newZoomLevel = documentViewer.getZoomLevel() * 100;
		setZoomLevel(newZoomLevel);
	}

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

			<Col className="pl2	">
				<AvatarGroup
					maxCount={2}
					testId="overrides"
					appearance="stack"
					data={data}
					size="large"
					css={{ background: 'red' }}
					overrides={{
						AvatarGroupItem: {
							render: (Component, props, index) => {
								console.log(
									'🚀 ~ file: ToolBar.tsx ~ line 90 ~ ToolBar ~ index',
									index
								);
								const avatarItem = <Component {...props} key={index} />;

								return index === 1 ? (
									<React.Fragment key={`${index}-overridden`}>
										<SearchButton
											className="m1"
											style={{ width: 250 }}
											placeholder="Search"
											prefix={<SearchOutlined />}
										/>
										<Row className="flex items-center">
											<Col span={21}>{avatarItem}</Col>
											<Col>
												<PopoverComponent
													content={content}
													placement="rightTop"
												/>
											</Col>
										</Row>
									</React.Fragment>
								) : (
									<Row className="flex items-center">
										<Col span={21}>{avatarItem}</Col>
										<Col>
											<PopoverComponent
												content={content}
												placement="rightTop"
											/>
										</Col>
									</Row>
								);
							}
						}
					}}
				/>
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
						onClick={() => {
							zoomIn()
							refreshZoomLevel();
						}}
						{...IncDecContainerProps}
					/>
					<>
						<SelectContainer
							disabled={false}
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

			<img src={PageIcon} alt="page" className="icon22" />
			<img onClick={() => createRectangle()} src={HandMoveIcon} alt="move" className="icon22" />
			<img src={VideoIcon} alt="video" className="icon22" />
			<img src={CallIcon} alt="call" className="icon22" />
			<img src={SizeChangeIcon} alt="size" className="icon22" />
			<img src={ShareIcon} alt="share" className="icon22" />
			<img src={CopyIcon} alt="copy" className="icon22" />
		</ToolBarContainer>
	);
};

export default ToolBar;
