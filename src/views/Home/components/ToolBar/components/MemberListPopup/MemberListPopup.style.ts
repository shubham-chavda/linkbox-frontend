import { Row } from 'antd';
import styled from 'styled-components'

export const ListingContainer = styled.div`
    height: 450px;
    overflow: auto;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &&::-webkit-scrollbar {
     display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    && {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
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