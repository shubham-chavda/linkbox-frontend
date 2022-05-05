import { Button, Form } from 'antd';
import React, { useRef } from 'react';
import { ButtonFilled } from '../../../../styles/Layout.style';
import {
	InputStyled,
	MainContainer,
	ModalDialog
} from './CreateFolderModal.style';

const CreateFolderModal = (props: any) => {
	const { isOpen } = props;
	const formRef = useRef(null);
	return (
		<MainContainer
			onClick={() => console.log('------------------------')}
			className="justify-center items-center"
			style={{ display: isOpen ? 'flex' : 'none' }}
		>
			<ModalDialog className="p2 m2">
				<div className="m1 p1">
					<div className="bold my3" style={{ fontSize: '16px' }}>
						Create Folder
					</div>
					<Form
						layout="vertical"
						name="createFolder"
						// onFinish={onFinish}
						scrollToFirstError
						requiredMark={false}
						ref={formRef}
					>
						<Form.Item
							label="Folder Name"
							name="folderName"
							rules={[
								{
									required: true,
									message: 'Please input folder name!'
								}
							]}
						>
							<InputStyled />
						</Form.Item>
						<div className="mt3 fluid ">
							<Button
								style={{ width: '45%' }}
								className="color-light-gray ml1  border-light-gray"
								shape="round"
								onClick={() => props.closeModal()}
							>
								Cancel
							</Button>
							<ButtonFilled
								ref={formRef}
								type="submit"
								className="ml1 "
								style={{ padding: '6px', width: '45%' }}
								onClick={() => props.closeModal()}
							>
								Create
							</ButtonFilled>
						</div>
					</Form>
				</div>
			</ModalDialog>
		</MainContainer>
	);
};

export default CreateFolderModal;
