import { Col, Select } from 'antd';
import styled from 'styled-components';

export const GenreSelector = styled(Select)`
	width: 130px;
	&& .ant-select-selector {
		border-radius: 12px !important;
	}
`;
export const ShareCol = styled(Col)`
	border: 1px solid #f2f2f2;
	border-radius: 24px;
`;
