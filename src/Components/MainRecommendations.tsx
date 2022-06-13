import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
} from "@coveo/headless/recommendation";
import { Theme } from "../theme";
import styled from "styled-components";
import RecommendtionCard, { SkeletonRecommendtionCard } from "./RecommendationCard";
import SampleImage from "../assests/sampleImages/recommendation.png";

interface RecommendationListProps {
  controller: HeadlessRecommendationList;
  engine: any;
}

export const RecommendationListRenderer: FunctionComponent<
  RecommendationListProps
> = (props) => {
  const engine = props.engine;
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  console.log("state recommendation list", state);

  useEffect(() => {

    setTimeout(() => {
      controller.refresh();
    controller.subscribe(() => setState(controller.state))
    }, 1000);
    
  
  }, []);


  if (state.error) {
    return (
      <div>
        <div>Oops {state.error.message}</div>
        <code>{JSON.stringify(state.error)}</code>
        <button onClick={() => controller.refresh()}>Try again</button>
      </div>
    );
  }

/*   if (!state.recommendations.length) {
    return <button onClick={() => controller.refresh()}>Refresh</button>;
  } */

  const logClick = (recommendation: Result) => {
    if (!engine) {
      return;
    }
    console.log('loggin')
    const { logRecommendationOpen } = loadClickAnalyticsActions(engine);
    engine.dispatch(logRecommendationOpen(recommendation));
  };

  const skeletonArray = [1,2,3]

  return (
    <MainWrapper>
      <Title>Recommendations</Title>
      <SubTitle>Here are your personalized recommendation</SubTitle>
      {state.recommendations.length > 0 ?
      <CardWrapper>
        {state?.recommendations?.slice(0, 6).map((recommendation, index) => {
          return (
            <RecommendtionCard
              video={false}
              title={recommendation.title}
              description={recommendation.excerpt}
              image={SampleImage}
              clickUri={recommendation.clickUri} 
              onClick={() => logClick(recommendation)}
              onContextMenu={() => logClick(recommendation)}
              onMouseDown={() => logClick(recommendation)}
              onMouseUp={() => logClick(recommendation)}
            />
          );
        })}
      </CardWrapper> : <CardWrapper>
        {skeletonArray.map((recommendation, index) => {
          return (
            <SkeletonRecommendtionCard/>
          );
        })}
      </CardWrapper> }
    </MainWrapper>
  );

};

const MainRecommendationList = () => {
  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: "fiservg0299c4q",
      accessToken: "xx6a51ceb9-3c7a-453f-b9eb-004ced9c6636",
    },
  });

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: "Recommendation" },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default MainRecommendationList;

const MainWrapper = styled.div`
  width: 95%;
  background-color: white;
  border-radius: 24px;
  position: relative;
  top: -40px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 10px 25px rgba(229, 232, 232, 0.6);
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 400;
  font-family: "Gibson";
  color: ${Theme.primary};
  margin-top: 30px;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  color: ${Theme.primary};
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1500px;
  margin-top: 20px;
`;

// usage

/**
 * ```tsx
 * const controller = buildRecommendationList(recommendationEngine, {
 *   options: {id: 'Recommendation'},
 * });
 *
 * <RecommendationList controller={controller} />;
 * ```
 */

/* import React from 'react';
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
},{
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
},]


const MainRecommendations = ()=>{


    return <MainWrapper>
        <Title>Recommendations</Title>
        <SubTitle>Subtitle here</SubTitle>
        <CardWrapper>
        {RecommendationCardsData.map((item,index)=>{
            return <RecommendtionCard video = {false} title = {item.title} description = {item.description} image = {item.image}/>
        })}
        </CardWrapper>
    </MainWrapper>
};


const MainWrapper = styled.div`
width: 95%;
background-color: white;
border-radius: 24px;
position: relative;
top: -40px;
padding: 40px 20px;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: 0px 10px 25px rgba(229, 232, 232, 0.6);
margin-bottom: 30px;
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

export default MainRecommendations; */