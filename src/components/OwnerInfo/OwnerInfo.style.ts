import { Input } from "antd";
import styled from "styled-components";

const {TextArea} = Input;
export const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
`;
export const Name = styled.div`
    font-size: 16px;
`;

export const Tag = styled.div`

    display: flex;
    justify-content: center;
    padding:5px 16px;
    color: #1379FF;
    border-radius:24px;
    background:#C7DDF388;

`;

export const InputBox = styled(Input)`
    border-radius:10px;

    padding:10px;
    border:none ;
    background: ${props=>props.readOnly ?  'transparant' :'#F5F7F9' };
    cursor:${props=>props.readOnly ?  'not-allowed' :'#F5F7F9' };
   `;
export const DescriptionBox = styled(TextArea)`
    border-radius:12px;

    padding:10px;
    border:none ;
    background: ${props=>props.readOnly ?  'transparant' :'#F5F7F9' };
    cursor:${props=>props.readOnly ?  'not-allowed' :'#F5F7F9' };
   `;