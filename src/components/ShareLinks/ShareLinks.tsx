import { Button, Checkbox, Col, Row, Select } from 'antd';
import React from 'react';
import { InfoIcon, ShareLinkIcon } from '../../assets';
import { GenreSelector, CopyButton, ShareCol } from './ShareLinks.style';

const ShareLinks = () => {
	return (
		<>
			<Row>
				<Col span={24} className="flex items-center justify-between">
					<GenreSelector
						labelInValue
						bordered
						placeholder="Genre"
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="jack">Jack (100)</Select.Option>
						<Select.Option value="lucy">Lucy (101)</Select.Option>
					</GenreSelector>
					<GenreSelector
						labelInValue
						bordered
						placeholder="Privacy"
						// dropdownStyle={{}}
						// onChange={handleChange}
					>
						<Select.Option value="jack">Jack (100)</Select.Option>
						<Select.Option value="lucy">Lucy (101)</Select.Option>
					</GenreSelector>
					<img src={InfoIcon} alt="info" className="icon16" />
				</Col>
			</Row>

			<Row className="mt2">
				<ShareCol span={24} className="flex justify-between ">
					<Col className="p1">
						<img src={ShareLinkIcon} alt="share" className="icon22" />
						<span className="p1 font-13">Get Sharable link</span>
					</Col>

					<CopyButton>copy</CopyButton>
				</ShareCol>
			</Row>

			<Col span={24} className="flex justify-center flex-column  my1 ">
				<Checkbox
					className="p1 font-12 color-sl"
					// onChange={onChange}
				>
					Deactivate Shareable link
				</Checkbox>
				<Button
					className="color-sl"
					shape="round"
					style={{ width: '100%', borderColor: '#686087' }}
					type="ghost"
				>
					Share with friends
				</Button>
			</Col>
			<Checkbox
				className="pt1 pl1 font-12 color-sl"
				// onChange={onChange}
			>
				Notification
			</Checkbox>
		</>
	);
};
export default ShareLinks;
