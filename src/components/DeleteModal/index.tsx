import { Button } from 'antd';
import React from 'react';
import { ButtonFilled } from '../../styles/Layout.style';
import { MainContainer, ModalDialog } from './DeleteModal.style';

interface IDeleteModal {
	isDelete: boolean;
	setIsDelete: any;
}
const DeleteModal: React.FC<IDeleteModal> = (props) => {
	const { isDelete, setIsDelete } = props;

	return (
		<MainContainer style={{ display: isDelete ? 'block' : 'none' }}>
			<ModalDialog className="p2 mt3">
				<div>
					<div className="center fluid font-13">
						Are you sure you want to delete comment 17?
					</div>
					<div className="mt3 fluid ">
						<Button
							style={{ width: '45%' }}
							className="color-light-gray ml1 font-13 border-light-gray"
							shape="round"
							onClick={setIsDelete}
						>
							Cancel
						</Button>
						<ButtonFilled
							className="ml1 font-13"
							style={{ padding: '6px', width: '45%' }}
						>
							Delete
						</ButtonFilled>
					</div>
				</div>
			</ModalDialog>
		</MainContainer>
	);
};

export default DeleteModal;
