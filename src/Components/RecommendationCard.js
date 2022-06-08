import React from 'react';
import theme, {Theme} from '../theme';
import styled from "styled-components";
import sampleImage from '../assests/sampleImages/recommendation.png'
import {chevronRight} from 'react-icons-kit/feather/chevronRight'
import { Icon } from 'react-icons-kit'

const RecommendtionCard = ({title, description, image, video = true})=>{


    return <MainWrapper>
        <Image src = {image}/>
        <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
        <ReferralLink>{!video? 'Learn more' : 'Watch now' } <div style = {{marginLeft: "5px", color : Theme.link }}><Icon icon = {chevronRight} /></div></ReferralLink>
        </TextWrapper>
    </MainWrapper>
};


const MainWrapper = styled.div`
height: 500px;
width: 400px;
border-radius: 16px;
border: 1px solid #E5E8E8;
overflow: hidden;
margin: 20px;
background: white;
cursor: pointer;
&:hover{
    border-color : ${Theme.link};
}

&:hover h3{
    color : #1372EC
}
`


const Image = styled.img`
height: 250px;
width: 100%;
object-fit : "contain";
`
const TextWrapper = styled.div`
display: flex;
width: 100%;
height: 230px;
align-items: center;
justify-content: space-around;
padding: 10px 20px;
flex-direction: column;

`

const Title = styled.h3`
font-family: 'Gibson';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 32px;
color: ${Theme.primary};
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`

const SubTitle = styled.span`
font-family: 'Gibson';
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 26px;
color: #626971;
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`


const ReferralLink = styled.a`
font-family: 'Gibson';
font-style: normal;
font-weight: 400;
font-size: 16px;
color: ${Theme.link};
text-decoration: none;
display: flex;
align-self: flex-start;
cursor: pointer;
`

export default RecommendtionCard;