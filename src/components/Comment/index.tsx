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
import DeleteModal from '../DeleteModal';
import EmojiPickerComponent from '../EmojiPicker';
import UploadImage from '../UploadImage';
import {
	CommentContainer,
	CommentInputDiv,
	InputBox,
	PostButton,
	ReplyButton
} from './Comment.style';
import AddComment from './components/AddComment';
import CommentInputOptions from './components/CommentInputOptions/CommentInputOptions';
import VoiceRecording from './components/VoiceRecording';

export default function CommentSection() {
	const [isComment, setIsComment] = useState(true);
	const [isReply, setIsReply] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	return !isComment ? (
		<div style={{ height: '93vh' }} className="flex items-center color-sl-gray">
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
		<div
			style={{ height: '93vh', overflowX: 'hidden' }}
			className="hide-scrollbar"
		>
			<DeleteModal isDelete={isDelete} setIsDelete={() => setIsDelete(false)} />
			<MemberCount className="ml2 mb1">28 members</MemberCount>
			<Comments
				index={11}
				setIsReply={() => setIsReply((prev) => !prev)}
				isDelete={() => setIsDelete(true)}
			>
				<div className="nested ml3">
					{[...Array(2)].map((_, index) => (
						<Comments
							className="nested"
							key={index}
							index={index}
							setIsReply={() => setIsReply((prev) => !prev)}
							isDelete={() => setIsDelete(true)}
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
	const { isDelete, setIsReply } = props;
	const [isEdit, setIsEdit] = useState(-1);
	const [inputValue, setInputValue] =
		useState(`We supply a series of design principles, practical patterns
	and high quality design resources (Sketch and Axure).`);
	const [enableEmojiPicker, setEnableEmojiPicker] = useState(false);

	const [enableRecording, setEnableRecording] = useState(false);
	const [enableUploadImage, setEnableUploadImage] = React.useState(false);

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
								<DeleteIcon onClick={isDelete} className="icon15" />
								<EditIcon onClick={() => setIsEdit(props.index)} />
							</div>

							<Col>
								{isEdit !== props.index ? (
									<p className="font-12 ">{inputValue}</p>
								) : (
									<>
										<EmojiPickerComponent
											enableEmojiPicker={enableEmojiPicker}
											setEnableEmojiPicker={() => setEnableEmojiPicker(false)}
											inputValue={(data: any) =>
												setInputValue((prev) => prev + data)
											}
										>
											<CommentInputDiv className="my1 flex item-center">
												<InputBox
													className="font-12 hide-scrollbar"
													rows={2}
													style={{ width: '100%' }}
													value={inputValue}
													placeholder="Write comment"
												/>

												<CommentInputOptions
													enableRecording={() =>
														setEnableRecording((prev) => !prev)
													}
													enableEmojiPicker={() =>
														setEnableEmojiPicker((prev) => !prev)
													}
													enableUploadImage={() =>
														setEnableUploadImage((prev) => !prev)
													}
												/>
											</CommentInputDiv>
										</EmojiPickerComponent>
										{enableUploadImage && <UploadImage />}
										{enableRecording && <VoiceRecording />}
									</>
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
													onClick={setIsReply}
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
										className="font-12 color-light-gray"
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
