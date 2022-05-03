import { Avatar, Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { PostButton } from '../../Comment.style';
import CommentInputOptions from '../CommentInputOptions/CommentInputOptions';
import { CommentInputDiv, InputBox } from './AddComment.style';

import VoiceRecording from '../VoiceRecording';
import EmojiPicker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import { Popover } from 'react-tiny-popover';
interface IAddComment {
	cancelReply: any;
}
interface IEmojiPicker {
	activeSkinTone?: string;
	emoji?: string;
	names?: string[];
	originalUnified?: string;
	unified?: string;
}
const AddComment: React.FC<IAddComment> = (props) => {
	const { cancelReply } = props;
	const [inputValue, setInputValue] = useState('');
	const [enableRecording, setEnableRecording] = useState(false);
	const [enableEmojiPicker, setEnableEmojiPicker] = useState(false);

	const [chosenEmoji, setChosenEmoji] = useState<IEmojiPicker>();

	const onEmojiClick = (event: any, emojiObject: any) => {
		setChosenEmoji(emojiObject);

		setInputValue((prev) => prev + emojiObject.emoji);
	};

	return (
		<Row className={`mb2 `} style={{ paddingLeft: '10px' }}>
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
						<Popover
							isOpen={enableEmojiPicker}
							positions={['bottom', 'top']}
							onClickOutside={() => setEnableEmojiPicker(false)}
							content={
								<EmojiPicker
									disableSkinTonePicker
									onEmojiClick={(e, data) => onEmojiClick(e, data)}
									disableAutoFocus
									skinTone={SKIN_TONE_NEUTRAL}
									groupNames={{ smileys_people: 'PEOPLE' }}
									native
								/>
							}
						>
							<CommentInputDiv className="my1 flex item-center">
								<InputBox
									value={inputValue}
									className="font-12 "
									style={{ width: '95%' }}
									onChange={(e) => setInputValue(e.target.value)}
									placeholder="Write comment"
								/>

								<CommentInputOptions
									enableRecording={() => setEnableRecording((prev) => !prev)}
									enableEmojiPicker={() =>
										setEnableEmojiPicker((prev) => !prev)
									}
								/>
							</CommentInputDiv>
						</Popover>

						{enableRecording && <VoiceRecording />}
					</Col>

					<div className="my1">
						<Button
							className="font-12 color-sl"
							style={{ padding: '0px 25px' }}
							shape="round"
							onClick={cancelReply}
						>
							Cancel
						</Button>
						<PostButton className="font-12  ml1 px3" shape="round">
							Post
						</PostButton>
					</div>
				</Row>
			</Col>
		</Row>
	);
};

export default AddComment;
