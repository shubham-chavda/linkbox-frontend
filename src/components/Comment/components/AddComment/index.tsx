import React, { useState } from 'react';
import { Avatar, Button, Col, notification, Row } from 'antd';

import { PostButton } from '../../Comment.style';
import { CommentInputDiv, InputBox } from './AddComment.style';
import CommentInputOptions from '../CommentInputOptions/CommentInputOptions';

import VoiceRecording from '../VoiceRecording';
import UploadImage from '../../../UploadImage';
import EmojiPickerComponent from '../../../EmojiPicker';

interface IAddComment {
	cancelReply: any;
	addComment: any;
}
interface IEmojiPicker {
	activeSkinTone?: string;
	emoji?: string;
	names?: string[];
	originalUnified?: string;
	unified?: string;
}

const AddComment: React.FC<IAddComment> = ({ cancelReply, addComment }) => {
	const [inputValue, setInputValue] = useState('');
	const [enableRecording, setEnableRecording] = useState(false);
	const [enableEmojiPicker, setEnableEmojiPicker] = useState(false);
	const [enableUploadImage, setEnableUploadImage] = useState(false);

	const addCommentValidation = () => {
		if (inputValue.trim().length) {
			addComment(inputValue)
		} else {
			notification.error({
				message: "Please enter comment"
			});
		}
	}

	return (
		<Row className={`mb2`} style={{ paddingLeft: '10px' }}>
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
					<Col>
						<EmojiPickerComponent
							enableEmojiPicker={enableEmojiPicker}
							setEnableEmojiPicker={() => setEnableEmojiPicker(false)}
							inputValue={(data: any) => setInputValue((prev) => prev + data)}
						>
							<CommentInputDiv className="my1 flex item-center">
								<InputBox
									value={inputValue}
									style={{ width: '100%' }}
									placeholder="Write comment"
									className="font-12 hide-scrollbar"
									onChange={(e) => setInputValue(e.target.value)}
								/>

								<CommentInputOptions
									enableRecording={() => setEnableRecording((prev) => !prev)}
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
					</Col>

					<div className="my1">
						<Button
							className="font-12 color-light-gray"
							style={{ padding: '0px 25px' }}
							shape="round"
							onClick={cancelReply}
						>
							Cancel
						</Button>
						<PostButton
							shape="round"
							className="font-12 ml1 px3"
							onClick={() => addCommentValidation()}
						>
							Post
						</PostButton>
					</div>
				</Row>
			</Col>
		</Row>
	);
};

export default AddComment;
