
import styled from "styled-components";

export const MainContainer = styled.div`
  display: none; /* Hidden by default */
  position: absolute;
  z-index: 1; /* Sit on top */
 
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(23, 9, 68, 0.06); /* Black w/ opacity */
`;
export const ModalDialog = styled.div`

  background-color: #fefefe;
  margin: auto;
  border-radius:12px;
  box-shadow:0 1px 4px rgba(0,0,0,0.2);
  width: 90%;

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
    &&:hover {
    background: #357ebd;
  }
`;
