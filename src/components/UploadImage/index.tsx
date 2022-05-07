import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import getBase64 from '../../helper/getBase64';
import { StyledUpload } from './UploadImage.style';

const UploadImage = () => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	// here we need to set status OK because we are only storing file.
	const customeSetStatus = ({ file, onSuccess }: any) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const handleCancel = () => setPreviewVisible(false);
	const handleChange = ({ fileList }: any) => setFileList(fileList);
	const handlePreview = async (file: any) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(
			file?.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		);
	};
	const uploadButton = (
		<div className="font-13">
			<PlusOutlined />
			<div style={{ width: '100px' }}>Upload</div>
		</div>
	);
	return (
		<div>
			<StyledUpload
				customRequest={customeSetStatus}
				accept="image/png, image/jpeg, image/jpg, image/svg"
				listType="picture-card"
				// fileList={fileList}
				multiple={true}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= 4 ? null : uploadButton}
			</StyledUpload>

			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={() => handleCancel()}
			>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</div>
	);
};

export default UploadImage;
