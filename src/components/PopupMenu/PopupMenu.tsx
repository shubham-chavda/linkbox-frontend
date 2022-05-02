import React, { useState } from 'react';
import { PopOverContent } from '../../views/Home/components/MemberList/MemberList.style';
import { Popover } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { TooltipPlacement } from 'antd/lib/tooltip';

interface IPopoverComponent {
	content?: any;
	placement: TooltipPlacement;
	visible?: boolean;
}
const PopupMenu: React.FC<IPopoverComponent> = (props) => {
	const [handleVisible, setHandleVisible] = useState(false);
	const { content, placement, visible } = props;

	return (
		<Popover
			// visible={visible || handleVisible}
			className="font-12 flex justify-center items-center"
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
