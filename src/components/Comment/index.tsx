import { Avatar, Button, Col, Comment, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {
	DeleteIcon,
	EditIcon,
	HeartIcon,
	LocationComment,
	LocationIcon,
	ReplyIcon
} from '../../assets';
import { MemberCount } from '../../views/Home/Home.style';
import {
	CommentContainer,
	CommentInputDiv,
	InputBox,
	PostButton,
	ReplyButton
} from './Comment.style';
import AddComment from './components/AddComment';
import CommentInputOptions from './components/CommentInputOptions/CommentInputOptions';

export default function CommentSection() {
	const [isComment, setIsComment] = useState(true);
	const [isReply, setIsReply] = useState(true);

	return !isComment ? (
		<div
			style={{ height: '93vh', color: '#AAAFB5' }}
			className="flex items-center"
		>
			<Row className="flex justify-center items-center">
				<Row className="fluid flex justify-center">
					<LocationIcon className="icon22" />
				</Row>
				<Row>Start Your Conversation</Row>
				<Row style={{ color: '#C5C9CE' }} className="my1 mx3 center">
					click anyware in the doc or select text to add a comment
				</Row>
			</Row>
		</div>
	) : (
		<div style={{ height: '93vh', overflowX: 'hidden' }}>
			<MemberCount className="ml2 mb1">28 members</MemberCount>
			<Comments index={11} setIsReply={() => setIsReply((prev) => !prev)}>
				<div className="nested ml3">
					{[...Array(2)].map((_, index) => (
						<Comments
							className="nested"
							key={index}
							index={index}
							setIsReply={() => setIsReply((prev) => !prev)}
						/>
					))}
					{isReply && <AddComment cancelReply={() => setIsReply(false)} />}
				</div>
			</Comments>
			{/* <Comments
				index={11}
				setIsReply={() => setIsReply((prev) => !prev)}
			></Comments> */}
		</div>
	);
}
function Comments(props: any) {
	const [isEdit, setIsEdit] = useState(-1);
	const message = `We supply a series of design principles, practical patterns
	and high quality design resources (Sketch and Axure).`;
	return (
		<CommentContainer>
			<div className={`mb2 ${props.className}`} style={{ paddingLeft: '10px' }}>
				<Row>
					<Col span={3}>
						<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
					</Col>
					<Col span={20} className="flex">
						<Row className=" fluid flex  items-center">
							<div
								style={{ width: '75%', height: '35px' }}
								className="flex items-center"
							>
								<div className="truncate">Heisenberg Martin</div>
							</div>
							<div
								style={{ flex: 1 }}
								className="flex justify-evenly items-center"
							>
								<DeleteIcon className="icon15" />
								<EditIcon onClick={() => setIsEdit(props.index)} />
							</div>

							<Col>
								{isEdit !== props.index ? (
									<p className="font-12 ">{message}</p>
								) : (
									<CommentInputDiv className="my1 flex item-center">
										<InputBox
											className="font-12 "
											rows={2}
											style={{ width: '95%' }}
											value={message}
											placeholder="Write comment"
										/>

										<CommentInputOptions />
									</CommentInputDiv>
								)}
							</Col>
							{isEdit !== props.index ? (
								<>
									<Col span={16}>
										<Row className="font-12 flex justify-around items-center">
											<Col className="flex  items-center">
												<LocationComment className="icon12" />
												<span className="ml1  ">15</span>
											</Col>
											<Col className="flex  items-center">
												<HeartIcon />
												<span className="ml1">18</span>
											</Col>
											<Col>
												<ReplyButton
													onClick={props.setIsReply}
													className="flex items-center px1"
												>
													<ReplyIcon
														className="icon12"
														style={{ marginRight: '5px' }}
													/>
													reply
												</ReplyButton>
											</Col>
										</Row>
									</Col>
									<Col
										span={7}
										className="font-12 right-align"
										style={{ color: '#C4CEDB' }}
									>
										18/01/2021
									</Col>
								</>
							) : (
								<div className="my1">
									<Button
										onClick={() => setIsEdit(-1)}
										className="font-12 color-sl"
										style={{ padding: '0px 25px' }}
										shape="round"
									>
										Cancel
									</Button>
									<PostButton className="font-12  ml1 px3" shape="round">
										Post
									</PostButton>
								</div>
							)}
						</Row>
					</Col>
				</Row>
			</div>
			{props.children}
		</CommentContainer>
	);
}
