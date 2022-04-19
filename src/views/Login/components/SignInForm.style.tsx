
import { Col, Input } from "antd";

import styled from "styled-components";
const {Password} =Input

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const HeaderText = styled.div`
    font-size: 35px;
    font-weight: bolder;
`;
export const SubText = styled.p`
    font-size: 18px;
    color: #9d9d9d;

    @media screen and (max-width: 1536px) {
        font-size: 14px;
    }
`;
export const InputField = styled(Input)`
    width: 80% !important;
    border-radius: 18px !important;
    min-height: 48px;

    @media screen and (max-width: 1536px) {
        min-height: 58px;
    }

`;
export const PasswordField = styled(Password)`
    width: 80% !important;
    border-radius: 18px !important;
    min-height: 48px;

    @media screen and (max-width: 1536px) {
        min-height: 58px;
    }

`;
export const SignInButton = styled.button`
    border-radius: 18px;
    min-height: 48px;
    border-radius: 24px ;
    color: white;
    border:none;
    background: rgb(24, 23, 49);
    width: 40%;

    @media screen and (max-width: 1536px) {
        min-height: 58px;
    }
`;
export const SignInOptions = styled(Col)`
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 48px;
    border-radius: 12px;
    font-size: 16px;
    color: rgb(24, 23, 49);
    border: solid 2px rgb(24, 23, 49);
    cursor: pointer;
    margin:8px;

    @media screen and (max-width: 1536px) {
        margin-top: 24px;
    }
`;