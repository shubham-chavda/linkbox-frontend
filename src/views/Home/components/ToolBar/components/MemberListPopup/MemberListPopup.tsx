import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Col } from 'antd';
import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import PopupMenu from '../../../../../../components/PopupMenu/PopupMenu';
import { SearchButtonFilled } from '../../../../../../styles/Layout.style';
import {
	ListingContainer,
	MainContainer,
	SubContainer
} from './MemberListPopup.style';
import nameInitials from 'name-initials';

const MemberListPopup: React.FC = () => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [isMorePopoverOpen, setIsMorePopoverOpen] = useState(false);
	const MemberList = [...Array(20)].map((_, i) => ({
		key: `johnDoe ${i}`,
		name: `john Doe ${i}`,
		src: 'https://joeschmoe.io/api/v1/random'
	}));

	const content = (
		<div>
			<div>Send a Message</div>
			<div>Video call</div>
			<div>Audio call</div>
			<div>Report inappropriate actions</div>
			<div>Block User</div>
		</div>
	);

	return (
		<div>
			<Popover
				isOpen={isPopoverOpen}
				positions={['bottom']}
				onClickOutside={() => setIsPopoverOpen(false)}
				content={
					<MainContainer className="box-shadow ">
						<SearchButtonFilled
							className="mx1 mt2 mb1"
							style={{ width: 250 }}
							placeholder="Search"
							prefix={<SearchOutlined />}
						/>
						<ListingContainer
							className="hide-scrollbar"
							style={{ scrollBehavior: 'smooth' }}
						>
							{MemberList.map((data) => {
								return (
									<SubContainer key={data.key} className="flex items-center m1">
										<Col span={21}>
											<Avatar
												style={{ backgroundColor: '#25CA69' }}
												// src="https://joeschmoe.io/api/v1/random"
												alt={data.name}
												size={45}
											>
												{nameInitials(data.name)}
											</Avatar>
											<span className="ml2" style={{ fontSize: '14px' }}>
												{data.name}
											</span>
										</Col>
										<Col>
											<PopupMenu content={content} placement="rightTop" />
										</Col>
									</SubContainer>
								);
							})}
						</ListingContainer>
					</MainContainer>
				}
			>
				<div onClick={() => setIsPopoverOpen((prev) => !prev)}>
					<Avatar.Group
						maxCount={1}
						size="large"
						maxPopoverTrigger="focus"
						maxStyle={{ backgroundColor: '#25CA69' }}
					>
						{MemberList.map((data) => {
							return (
								<Avatar
									key={data.key}
									style={{ backgroundColor: '#25CA69' }}
									alt={data.name}
								>
									{nameInitials(data.name)}
								</Avatar>
							);
						})}
					</Avatar.Group>
				</div>
			</Popover>
		</div>
	);
};
export default MemberListPopup;
