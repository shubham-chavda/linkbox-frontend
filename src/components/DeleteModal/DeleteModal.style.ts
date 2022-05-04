
import styled from "styled-components";

export const MainContainer = styled.div`
    &&:before {
        content: "";
        display: none;
        background: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
  }
  &&.opened:before {
    display: block;
  }
  &&.opened .modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
    top: 20%;
  }
`;
export const ModalDialog = styled.div`

    background: #fefefe;
    border: #333333 solid 0px;
    border-radius: 12px;
    /* margin-left: -10px; */
    text-align:center;
    position: absolute;
    /* left: 50%;
    top: -100%; */
    z-index: 11;
    width: 90%;
    box-shadow:0 5px 10px rgba(0,0,0,0.3);
    -webkit-transform: translate(0, -500%);
    -ms-transform: translate(0, -500%);
    transform: translate(0, -500%);
    -webkit-transition: -webkit-transform 0.3s ease-out;
    -moz-transition: -moz-transform 0.3s ease-out;
    -o-transition: -o-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;

`;

export const StyledButton = styled.button`

    background: #428bca;
    border: #357ebd solid 0px;
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    padding: 8px 15px;
    text-decoration: none;
    text-align: center;
    min-width: 60px;
    position: relative;
    transition: color .1s ease;
    && :hover {
    background: #357ebd;
  }
`;
