import React from 'react';
import {Theme} from '../../theme';
import styled from "styled-components";
import { HeroConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';

const HeroHome: React.FC = ()=>{
    const navigate = useNavigate();
    return <Wrapper>
        <TextWrapper>
        <Title>{HeroConfig.title}</Title>
        <SubTitle>{HeroConfig.description}</SubTitle>
        <Button onClick = {()=> navigate(HeroConfig.onClickButtonRedirect)}>{HeroConfig.buttonText}</Button>
        </TextWrapper>
    </Wrapper>
};



const Wrapper = styled.div`
height: 400px;
width: 100%;
background-color: aliceblue;
font-family: inherit;
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 120px;
background: url(${HeroConfig.background}) no-repeat;
background-position: 50%;
background-size: cover;
@media (max-width: 480px) {
    padding-left: 10px;
   width: 100vw;
   justify-content: flex-start;
   padding-top: 80px;
}
`

const TextWrapper = styled.div`
max-width: 60%;

`


const Title = styled.h1`
font-weight: 400;
font-size: 56px;
line-height: 66px;
color: ${Theme.HeroBannerText};
margin-bottom: 20px;
@media (max-width: 480px) {
    font-size: 40px;
}
`


const SubTitle = styled.p`
font-weight: 300;
font-size: 20px;
line-height: 28px;
color: ${Theme.HeroBannerText};
margin-bottom: 20px;
@media (max-width: 480px) {
    width: 80%;
}
`

const Button = styled.button`
padding: 11px 37px;
background-color: ${Theme.button};
font-family: inherit;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
text-align: center;
color: ${Theme.secondaryText};
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    background-color: ${Theme.button}CC;
}

`

export default HeroHome;