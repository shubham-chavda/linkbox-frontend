import { Avatar, Col, Popover, Row } from "antd";
import styled from "styled-components";


export const MainContainer = styled.div`
    width:auto;
    /* background:yellow; */
`;

export const MemberCount = styled.div`
    padding:20px;
    color:gray;
    font-size:12px;
`;

export const MemberListContainer = styled(Row)`

    width:100%;
    height: 58vh;
    padding:0 20px;
    overflow:auto;

`;

export const ListSubContainer = styled.div`

    display:flex;
    height:60px; 
    align-items:center;
    width:100%;
`;

export const AvatarImg = styled(Avatar)`

   border:1px solid gray;
`;

export const Name = styled(Col)`
    white-space:nowrap;
    overflow:hidden;
    font-size:15px;
    text-overflow:ellipsis;
`;

export const PopOverContent = styled(Col)`
      font-size:12px;
      color:#fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      && div{
          padding:6px 10px;

          :hover{
              background-color: #ffffff11;
          }

      }
`;
