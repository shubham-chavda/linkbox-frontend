import { Comment } from "antd";
import styled from "styled-components";

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