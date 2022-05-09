import { Avatar, Col, Row } from "antd";
import styled from "styled-components";


export const MainContainer = styled.div`
    width:auto;
    /* background:yellow; */
`;

export const MemberCount = styled.div`
	font-weight: bold;

    padding:20px;
    color:#C4CEDB;
    font-size:12px;
`;

export const MemberListContainer = styled(Row)`

    width:100%;
    height: 60vh;
    padding:0 20px;
    overflow:auto;

`;

export const ListSubContainer = styled.div`

    display:flex;
    height:60px; 
    align-items:center;
    width:100%;
`;

export const Name = styled(Col)`
    white-space:nowrap;
    overflow:hidden;
    font-size:15px;
    text-overflow:ellipsis;
`;

export const PopOverContent = styled(Col)`
      color:#fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      && div{
          padding:2px 10px;
          font-size:11px;
          :hover{
              background-color: #ffffff11;
          }

      }
`;
