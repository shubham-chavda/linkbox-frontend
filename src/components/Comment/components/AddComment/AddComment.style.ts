import { Input } from "antd";
import styled from "styled-components";

const {TextArea} = Input;

export const CommentInputDiv = styled.div`
     background:#F5F7F9;
      border-radius:12px;

`;
export const InputBox = styled(Input)`
    border-radius:12px;
    width: 180px;
    padding:10px;
    background:transparent;
    border:none;
    
    &&::-webkit-scrollbar {
     display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    && {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
`;