import styled from "styled-components";


export const MainContainer = styled.div`

    && :not(:last-child){
        border-right: 1px solid #ffffff22;
    }
    
    && .nestedStyles{
        font-size: 13px;
        padding: 8px 14px;
    }
    && .nestedStyles:hover{
        background: #ffffff11;
    }
`;