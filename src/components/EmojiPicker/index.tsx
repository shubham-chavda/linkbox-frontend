import EmojiPicker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';

const EmojiPickerComponent = (props: any) => {
	const { enableEmojiPicker, setEnableEmojiPicker, inputValue } = props;
	const [choosenEmoji, setChosenEmoji] = useState('');

	const onEmojiClick = (event: any, emojiObject: any) => {
		setChosenEmoji((prev) => prev + emojiObject.emoji);
		inputValue(emojiObject.emoji);
	};
	return (
		<Popover
			isOpen={enableEmojiPicker}
			positions={['bottom', 'top']}
			onClickOutside={setEnableEmojiPicker}
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
			{props.children}
		</Popover>
	);
};

export default EmojiPickerComponent;
