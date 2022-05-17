import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Row } from 'antd';
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
import _ from 'lodash';
import AddComment from './components/AddComment';
import nameInitials from 'name-initials';
import CommentInputOptions from './components/CommentInputOptions/CommentInputOptions';
import VoiceRecording from './components/VoiceRecording';

type CommentSectionTypes = {
	isOpen: any,
	annotationManager: any,
	annotations: any,
	updatedAnnotation: any,
	documentViewer: any,
}

export default function CommentSection({
	isOpen,
	annotationManager,
	annotations,
	updatedAnnotation,
	documentViewer,
}: CommentSectionTypes) {
	// const { isOpen, annotationManager, annotations, updatedAnnotation } = props;

	const [isComment, setIsComment] = useState(true);
	const [isReply, setIsReply] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

	const [commentList, setCommentList] = useState<any>([]);

	useEffect(() => {
		const measurementAnnotation = annotationManager.getAnnotationsList();
		const NotesArray = _.filter(measurementAnnotation, (obj: any) => {
			if (obj.Qda) return true;
			return false;
		});
		setCommentList(NotesArray || []);
	}, [])

	const onSendCommentEvent = (text: any) => {
		annotationManager.setNoteContents(updatedAnnotation[0], text);
	}

	const addComment = async (inputText: string) => {
		if (updatedAnnotation) {
			if (isReply) {
				createMentionReply(inputText)
			} else {
				await annotationManager.setNoteContents(updatedAnnotation, inputText);
				setCommentList([...commentList, updatedAnnotation]);
			}
		}
	}

	const extractMentionDataFromStr = (str: any) => {
		const markupRegex = /@\[(.*?)\]\((.*?)\)/g;
		const ids = [];
		let match;
		let plainTextValue = str;
		while ((match = markupRegex.exec(str)) !== null) {
			const [wholeMatch, displayName, id] = match;
			ids.push(id);
			plainTextValue = plainTextValue.replace(
				// keep the @ and only replace the remaining text
				wholeMatch.slice(1),
				displayName,
			);
		}
		return { plainTextValue, ids };
	}

	const createMentionReply = (inputText: any) => {
		const { plainTextValue, ids } = extractMentionDataFromStr(inputText);
		// new MarkupAnnotation()
		const replyAnnot = new annotations.StickyAnnotation();
		replyAnnot['InReplyTo'] = updatedAnnotation['Id'];
		replyAnnot['X'] = updatedAnnotation['X'];
		replyAnnot['Y'] = updatedAnnotation['Y'];
		replyAnnot['PageNumber'] = updatedAnnotation['PageNumber'];
		replyAnnot['Author'] = annotationManager.getCurrentUser();
		replyAnnot.setContents(plainTextValue || '');
		replyAnnot.setCustomData('trn-mention', JSON.stringify({
			contents: inputText,
			ids,
		}));
		console.log("replyAnnot --------->", replyAnnot);

		annotationManager.createAnnotationReply(replyAnnot, inputText);
		// annotationManager.addAnnotations([replyAnnot]);
		setCommentList([...commentList, replyAnnot])
	}

	console.log("setCommentList ============>", commentList);

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
			className="hide-scrollbar"
			style={{ height: '93vh', overflowX: 'hidden' }}
		>
			<DeleteModal isDelete={isDelete} setIsDelete={() => setIsDelete(false)} />
			<MemberCount className="ml2 mb1">28 members</MemberCount>

			<div className="nested ml3">
				{commentList && commentList.map((comment: any, index: number) => {
					const InReplyTo = comment.InReplyTo;
					return (
						<>
							{!InReplyTo ?
								<Comments
									key={index}
									index={index}
									commentText={comment.Qda || "----"}
									isDelete={() => setIsDelete(true)}
									onSendComment={onSendCommentEvent}
									setIsReply={() => setIsReply((prev) => !prev)}
								/> :
								<Comments
									index={index}
									className="nested"
									isDelete={() => setIsDelete(true)}
									onSendComment={onSendCommentEvent}
									commentText={comment.Qda || "----"}
									setIsReply={() => setIsReply((prev) => !prev)}
								/>
							}
						</>
					)
				}
				)}
				{isReply &&
					<AddComment
						addComment={createMentionReply}
						cancelReply={() => setIsReply(false)}
					/>
				}
			</div>
			{!commentList.length ?
				<AddComment
					addComment={addComment}
					cancelReply={() => setIsReply(false)}
				/> : null
			}
		</div>
	);
}
function Comments(props: any) {
	const { isDelete, setIsReply, onSendComment, commentText, index } = props;

	const [isEdit, setIsEdit] = useState(-1);
	const [inputValue, setInputValue] = useState(commentText);
	const [enableEmojiPicker, setEnableEmojiPicker] = useState(false);

	const [enableRecording, setEnableRecording] = useState(false);
	const [enableUploadImage, setEnableUploadImage] = React.useState(false);


	console.log("index --------------->", index);

	return (
		<CommentContainer>
			<div className={`mb2 ${props.className}`} style={{ paddingLeft: '10px' }}>
				<Row>
					<Col span={3}>
						<Avatar
							style={{ backgroundColor: '#25CA69' }}
							// src="https://joeschmoe.io/api/v1/random"
							alt="Heisenberg Martin"
						>
							{nameInitials('Heisenberg Martin')}
						</Avatar>
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
											inputValue={(data: any) => setInputValue((prev: any) => prev + data)}
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
												<span className="ml1">15</span>
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
									<PostButton
										shape="round"
										className="font-12  ml1 px3"
										onClick={() => {
											onSendComment(inputValue);
											setIsEdit(-1);
										}}
									>
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
