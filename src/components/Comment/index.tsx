import { DownloadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Comment, Row } from 'antd';
import React, { useState } from 'react';
import {
	DeleteIcon,
	EditIcon,
	HeartIcon,
	LocationComment,
	LocationIcon,
	ReplyIcon
} from '../../assets';
import { CommentContainer, ReplyButton } from './Comment.style';

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
			<Comments>
				<div className="nested ml3">
					{[...Array(2)].map((_, index) => (
						<Comments className="nested" key={index} />
					))}
				</div>
			</Comments>
			<Comments />
			<Comments />
		</div>
	);
}
const Comments = (a: any) => (
	<CommentContainer>
		{console.log('🚀 ~ file: index.tsx ~ line 40 ~ children', a)}
		<div className={`mb2 ${a.className}`} style={{ paddingLeft: '10px' }}>
			<Row>
				<Col span={19} className="truncate">
					<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
					<span className="pl1">Heisenberg Martin</span>
				</Col>
				<Col span={4} className="flex justify-around items-center">
					<DeleteIcon className="icon15" />
					<EditIcon className="icon16" />
				</Col>
			</Row>
			<Row>
				<p className="font-12 mr2" style={{ marginLeft: '40px' }}>
					We supply a series of design principles, practical patterns and high
					quality design resources (Sketch and Axure).
				</p>
			</Row>
			<Row className="flex items-center font-12">
				<Col span={3}></Col>
				<Col span={13}>
					<Row className="flex justify-around items-center">
						<Col>
							<LocationComment className="icon12" />
							<span className="ml1">15</span>
						</Col>
						<Col>
							<HeartIcon className="icon12" />
							<span className="ml1">18</span>
						</Col>
						<Col>
							<ReplyButton className="flex items-center px1">
								<ReplyIcon className="icon12" style={{ marginRight: '5px' }} />
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
			</Row>
		</div>
		{a.children}
	</CommentContainer>
);
