import { Avatar, Col, Comment, Row } from 'antd';
import React, { useState } from 'react';
import { DeleteIcon, LocationIcon } from '../../assets';

export default function CommentSection() {
	const [isComment, setIsComment] = useState(true);

	return !isComment ? (
		<div
			style={{ height: '100%', color: '#AAAFB5' }}
			className="flex items-center "
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
			<ExampleComment>
				<ExampleComment />
				<ExampleComment />
			</ExampleComment>
			<ExampleComment />
			<ExampleComment />
			<ExampleComment />
		</div>
	);
}
const ExampleComment = ({ children }: any) => (
	<Comment
		actions={[<span key="comment-nested-reply-to">Reply to</span>]}
		author={
			<Row>
				<Col className="font-14" style={{ color: 'black' }}>
					John Martin
				</Col>
			</Row>
		}
		avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
		content={
			<p className="font-12">
				We supply a series of design principles, practical patterns and high
				quality design resources (Sketch and Axure).
			</p>
		}
	>
		<div style={{ borderLeft: '1px solid #ECF2F7' }}>{children}</div>
	</Comment>
);
