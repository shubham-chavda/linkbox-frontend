import { DeleteFilled, SmileOutlined } from '@ant-design/icons';
import React from 'react';
import { AttachmentIcon, VoiceIcon } from '../../../../assets';
import PopupMenu from '../../../PopupMenu/PopupMenu';
import { MainContainer } from './CommentInputOptions.style';

interface CommentInputOptions {
	enableRecording: any;
	enableEmojiPicker: any;
}
const CommentInputOptions = (props: any) => {
	const { enableRecording, enableEmojiPicker } = props;
	const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
	const content = (
		<MainContainer>
			<span
				className="nestedStyles"
				onClick={() => {
					enableRecording();
					setIsPopUpVisible(false);
				}}
			>
				<VoiceIcon className="icon16" color="white" />
			</span>
			<span className="nestedStyles">
				<AttachmentIcon className="icon16" color="white" />
			</span>
			<SmileOutlined
				onClick={() => {
					enableEmojiPicker();
					setIsPopUpVisible(false);
				}}
				className="nestedStyles"
			/>
			<span className="nestedStyles">Aa</span>
		</MainContainer>
	);
	return (
		<>
			<PopupMenu
				visible={isPopUpVisible}
				content={content}
				placement="topRight"
			/>
		</>
	);
};

export default CommentInputOptions;
