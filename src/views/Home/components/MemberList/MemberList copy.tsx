import { Col, Popover, Row } from 'antd';
import React from 'react';
import {
	MemberCount,
	MainContainer,
	MemberListContainer,
	ListSubContainer,
	AvatarImg,
	Name,
	PopOverContent
} from './MemberList.style';
import { MoreOutlined } from '@ant-design/icons';
import Popper from '@mui/material/Popper';

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
			<MainContainer>
				<Row>
					<MemberCount>28 members</MemberCount>
				</Row>
				<MemberListContainer>
					{[...Array(20)].map((_, index) => (
						<ListSubContainer key={index}>
							<Col>
								<AvatarImg src="https://joeschmoe.io/api/v1/random" size={45} />
							</Col>
							<Name span={15} offset={1}>
								John Doe
							</Name>
							<Col>
								<Popper
									open={true}
									placement="left-start"
									disablePortal={true}
									modifiers={[
										{
											name: 'flip',
											enabled: false,
											options: {
												altBoundary: false,
												rootBoundary: 'document',
												padding: 8
											}
										},
										{
											name: 'preventOverflow',
											enabled: false,
											options: {
												altAxis: false,
												altBoundary: false,
												tether: false,
												rootBoundary: 'document',
												padding: 8
											}
										},
										{
											name: 'arrow',
											enabled: true,
											options: {
												// element: arrowRef
											}
										}
									]}
								>
									<MoreOutlined style={{ fontSize: '18px' }} />
								</Popper>
							</Col>
						</ListSubContainer>
					))}
				</MemberListContainer>
			</MainContainer>
		</>
	);
};
export default MemberList;
