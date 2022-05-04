import { Button, Comment, Input } from "antd";
import styled from "styled-components";

const {TextArea} = Input;
export const CommentStyled = styled(Comment)`
    && .ant-comment-inner{
        padding: 0px !important;
    }
`;
export const CommentContainer = styled.div`
    && .nested{
        border-left:1px solid #ECF2F7;
    }
`;
export const ReplyButton = styled.div`
    margin-left:5px;
    border-radius:12px;
    border: 1px solid #F0F0F0;
`;
export const PostButton = styled(Button)`

    background: #170944 !important;
    color:white;
     
`;
export const CommentInputDiv = styled.div`
     background:#F5F7F9;
      border-radius:12px;

`;


export const InputBox = styled(TextArea)`
    border-radius:12px;
    width: 180px;
    padding:10px;
    background:transparent;
    border:none;

`;