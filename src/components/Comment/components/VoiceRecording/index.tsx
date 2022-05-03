import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import useInterval from '../../../../hooks/useInterval';
import { ControlsContainer } from './VoiceRecording.style';

const VoiceRecording = () => {
	const [record, setRecord] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);

	function Counter() {
		if (record) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useInterval(() => {
				if (seconds == 59) {
					setMinutes((prev: number) => prev + 1);
					setSeconds(0);
				} else {
					setSeconds((prev: number) => prev + 1);
				}
			}, 1000);
		}

		return (
			<div className="font-12 ">
				{minutes.toString().padStart(2, '0')}:
				{seconds.toString().padStart(2, '0')}
			</div>
		);
	}
	const onData = (recordedBlob: any) => {
		// console.log('chunk of real-time data is: ', recordedBlob);
	};

	const onStop = (recordedBlob: any) => {
		console.log('recordedBlob is: ', recordedBlob);
	};

	return (
		<ControlsContainer
			className="flex items-center"
			style={{ fontSize: '20px' }}
		>
			{/* <p>{status}</p> */}
			{!record ? (
				<CaretRightOutlined onClick={() => setRecord(true)} />
			) : (
				<PauseOutlined onClick={() => setRecord(false)} />
			)}
			{/* <Col span={17}> */}
			<ReactMic
				// style={{ width: '60%' }}
				// visualSetting="sinewave"
				record={record}
				width={150}
				height={30}
				className="sound-wave "
				onStop={onStop}
				onData={onData}
				strokeColor="#000000"
				mimeType="audio/webm"
				echoCancellation={true}
			/>
			{/* </Col> */}
			{<Counter />}
		</ControlsContainer>
	);
};

export default VoiceRecording;
