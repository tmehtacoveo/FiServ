import React from 'react';
import theme, {Theme} from '../theme';
import styled from "styled-components";
import HeroImage from '../assests/Heading.jpg'

const HeroHome = ()=>{
    return <Wrapper>
        <TextWrapper>
        <Title>Life changes fast</Title>
        <SubTitle>A BTEP Mortgage gives you the flexibility to use the equity from your home when you need it. </SubTitle>
        <Button>Learn more</Button>
        </TextWrapper>
    </Wrapper>
};



const Wrapper = styled.div`
height: 553px;
width: 100%;
background-color: aliceblue;
font-family: 'Gibson';
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 120px;
background: url(${HeroImage}) no-repeat;
background-position: right center;
background-size: cover;
`

const TextWrapper = styled.div`
width: 450px;

`


const Title = styled.h1`
font-weight: 400;
font-size: 56px;
line-height: 66px;
color: ${Theme.primary};
margin-bottom: 20px;
@media (max-width: 1000px) {
    display: none;
}
`


const SubTitle = styled.p`
font-weight: 300;
font-size: 18px;
line-height: 28px;
color: ${Theme.primary};
margin-bottom: 20px;
@media (max-width: 1000px) {
    display: none;
}
`

const Button = styled.button`
padding: 8px 16px;
width: 100px;
height: 40px;
background-color: ${Theme.button};
border-radius: 8px;
font-family: 'Gibson';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 24px;
color: #FFFFFF;
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    background-color: ${Theme.button}CC;
}
`

export default HeroHome;