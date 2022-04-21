import React from 'react';
import { PopOverContent } from '../../views/Home/components/MemberList/MemberList.style';
import { Popover } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

interface IPopoverComponent {
	content?: any;
	placement: any;
}
const PopupMenu: React.FC<IPopoverComponent> = (props) => {
	const { content, placement } = props;
	return (
		<Popover
			className="font-12"
			autoAdjustOverflow
			placement={placement}
			content={<PopOverContent>{content}</PopOverContent>}
			trigger="click"
			overlayInnerStyle={{
				borderRadius: '10px',
				overflow: 'hidden'
			}}
		>
			<MoreOutlined style={{ fontSize: '18px' }} />
		</Popover>
	);
};
export default PopupMenu;
