import React, { useEffect, useState } from 'react';
import { Spin, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Tab } from './FileTabBar.style';
import history from '../../../../history';
import { initPanel } from '../../../../types/Home.interface';

const { TabPane } = Tabs;
interface IFileTabBar {
	initialPanes: initPanel;
	onTabChange: (activeKey: string) => void;
}
const FileTabBar: React.FC<IFileTabBar> = (props) => {
	const { initialPanes, onTabChange } = props;

	const [activeKey, setActiveKey] = useState('');
	const [panes, setPanes] = useState<initPanel | null>();

	useEffect(() => {
		setPanes(initialPanes);
		setActiveKey(initialPanes[0]?.key);
	}, [initialPanes]);

	const onChange = (activeKey: string) => {
		console.log(
			'🚀 ~ file: FileTabBar.tsx ~ line 25 ~ onChange ~ activeKey',
			activeKey
		);
		setActiveKey(activeKey);
		onTabChange(activeKey);
	};

	const onEdit = (
		e: React.MouseEvent | React.KeyboardEvent | string,
		action: 'add' | 'remove'
	) => {
		console.log({ e, action });

		if (action == 'add') {
			// add();
		} else if (action == 'remove') {
			if (typeof e == 'string') {
				remove(e);
			}
		}
	};

	const remove = (targetKey: string) => {
		let newActiveKey = activeKey;
		let lastIndex = 0;
		panes?.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const newPanes = panes?.filter((pane) => pane.key !== targetKey);
		if (newPanes?.length && newActiveKey === targetKey) {
			if (lastIndex >= 0) {
				newActiveKey = newPanes[lastIndex].key;
			} else {
				newActiveKey = newPanes[0].key;
			}
		}

		setPanes(newPanes);
		onChange(newActiveKey);
		if (!newPanes?.length) {
			history.navigate?.('/documents');
		}
	};
	const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
	return (
		<Tab
			hideAdd
			type="editable-card"
			size="small"
			style={{ border: 'none' }}
			onChange={onChange}
			activeKey={activeKey}
			onEdit={onEdit}
		>
			{panes?.map((pane) => (
				<TabPane
					closable={true}
					key={pane.key}
					tab={pane.title || <Spin indicator={antIcon} size="small" />}
				/>
			))}
		</Tab>
	);
};
export default FileTabBar;
