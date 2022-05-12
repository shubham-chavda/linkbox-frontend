import { Avatar, Col, Popover, Row } from 'antd';
import React from 'react';
import {
	MemberCount,
	MainContainer,
	MemberListContainer,
	ListSubContainer,
	Name,
	PopOverContent
} from './MemberList.style';

import nameInitials from 'name-initials';
import { MoreOutlined } from '@ant-design/icons';

const MemberList: React.FC = () => {
	const content = (
		<PopOverContent>
			{/* <Button type="text" >Send Message</Button>
     <Button type="text" >Report inappropriate actions</Button>
     <Button type="text" >Unlock user</Button> */}

			<div>Send Message</div>
			<div>Report inappropriate actions</div>
			<div>Unlock user</div>
		</PopOverContent>
	);
	return (
		<>
			<MainContainer className="height-full">
				<Row>
					<MemberCount>28 members</MemberCount>
				</Row>
				<MemberListContainer>
					{[...Array(20)].map((_, index) => (
						<ListSubContainer key={index}>
							<Col>
								<Avatar
									style={{ backgroundColor: '#25CA69' }}
									// src="https://joeschmoe.io/api/v1/random"
									alt="name"
									size={45}
								>
									{nameInitials('John Doe')}
								</Avatar>
								{/* <AvatarImg src="https://joeschmoe.io/api/v1/random" size={45} /> */}
							</Col>
							<Name span={15} offset={1}>
								John Doe {index + 1}
							</Name>
							<Col>
								<Popover
									className="font-12"
									autoAdjustOverflow
									placement="leftTop"
									content={content}
									trigger="click"
									overlayInnerStyle={{
										borderRadius: '10px',
										overflow: 'hidden'
									}}
								>
									<MoreOutlined style={{ fontSize: '18px' }} />
								</Popover>
							</Col>
						</ListSubContainer>
					))}
				</MemberListContainer>
			</MainContainer>
		</>
	);
};
export default MemberList;
