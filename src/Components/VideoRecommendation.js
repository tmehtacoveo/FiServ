import React from 'react';
import theme, {Theme} from '../theme';
import styled from "styled-components";
import RecommendtionCard from './RecommendationCard';
import SampleImage from '../assests/sampleImages/recommendation.png'


const RecommendationCardsData = [{
    title: 'Travelling out of province or the country',
    description : 'Make sure you’re protected. Consider CIBC Travel Medical Insurance.',
    image : SampleImage
},{
    title: 'Travelling out of province or the country',
    description : 'Make sure you’re protected. Consider CIBC Travel Medical Insurance.',
    image : SampleImage
},{
    title: 'Travelling out of province or the country',
    description : 'Make sure you’re protected. Consider CIBC Travel Medical Insurance.',
    image : SampleImage
}]


const VideoRecommendations = ()=>{


    return <MainWrapper>
        <Title>Videos</Title>
        <SubTitle>Subtitle here</SubTitle>
        <CardWrapper>
        {RecommendationCardsData.map((item,index)=>{
            return <RecommendtionCard video = {true} title = {item.title} description = {item.description} image = {item.image}/>
        })}
        </CardWrapper>
    </MainWrapper>
};


const MainWrapper = styled.div`
width: 95%;
border-radius: 24px;
position: relative;
top: -40px;
padding: 40px 20px;
display: flex;
flex-direction: column;
align-items: center;
`

const Title = styled.h2`
font-size: 32px;
font-weight: 400;
font-family: 'Gibson';
color: ${Theme.primary};
margin-top: 30px;
margin-bottom: 10px;
`


const SubTitle = styled.p`
font-weight: 300;
font-size: 18px;
line-height: 28px;
color: ${Theme.primary};
margin-bottom: 20px;
`

const CardWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
max-width: 1500px;
margin-top: 20px;
`

export default VideoRecommendations;