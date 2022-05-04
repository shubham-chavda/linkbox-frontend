import React from 'react';
import { MainContainer, ModalDialog, StyledButton } from './DeleteModal.style';

interface IDeleteModal {
	isDelete: boolean;
}
const DeleteModal: React.FC<IDeleteModal> = (props) => {
	const { isDelete } = props;
	console.log('🚀 ~ file: index.tsx ~ line 9 ~ isDelete', isDelete);

	return (
		<MainContainer className={` ${isDelete && 'opened'}`} aria-hidden="true">
			{/* <ModalDialog className="modal-dialog">
				<div>
					Are you sure you want to delete comment 17?
					<div>
						<StyledButton className="btn">Cancel</StyledButton>
						<StyledButton className="btn">delete</StyledButton>
					</div>
				</div>
			</ModalDialog> */}
		</MainContainer>
	);
};

export default DeleteModal;
