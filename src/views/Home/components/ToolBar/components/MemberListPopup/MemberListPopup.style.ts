import { Row } from 'antd';
import styled from 'styled-components'

export const ListingContainer = styled.div`
    height: 450px;
    overflow: auto;

  
`

export const SubContainer = styled(Row)`
    &:hover{
        background:#FAFAFA;
    }
`;
export const MainContainer = styled.div`
    background: #fff;
    border-radius: 12px;
`