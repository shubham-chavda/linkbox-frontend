import { Tabs } from 'antd';
import { add } from 'lodash';
import React, { useEffect, useState } from 'react';
import { initPanel } from '../../../../types/Home.interface';
import { Tab } from './FileTabBar.style';
import history from '../../../../history';

const { TabPane } = Tabs;
interface IFileTabBar {
	initialPanes: initPanel;
	onTabChange: (activeKey: string) => void;
}
const FileTabBar: React.FC<IFileTabBar> = (props) => {
	const newTabIndex = 0;
	const [activeKey, setActiveKey] = useState('');
	const [panes, setPanes] = useState<initPanel | null>();

	useEffect(() => {
		setPanes(props.initialPanes);
		setActiveKey(props.initialPanes[0].key);
	}, []);

	const onChange = (activeKey: string) => {
		setActiveKey(activeKey);
		props.onTabChange(activeKey);
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

	// add = () => {

	// 	const activeKey = `newTab${this.newTabIndex++}`;
	// 	const newPanes = [...panes];
	// 	newPanes.push({
	// 		title: 'New Tab',
	// 		content: 'Content of new Tab',
	// 		key: activeKey
	// 	});
	// 	this.setState({
	// 		panes: newPanes,
	// 		activeKey
	// 	});
	// };

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
				<TabPane tab={pane.title} key={pane.key} closable={true} />
			))}
		</Tab>
	);
};
export default FileTabBar;
