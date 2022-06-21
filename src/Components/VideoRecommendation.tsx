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
import SampleImage from "../assets/sampleImages/recommendation.png";

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
  console.log("video recommendation list", state);

  useEffect(() => {
    controller.refresh();
    controller.subscribe(() => setState(controller.state))
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
      <Title>Videos</Title>
      <SubTitle>Here are your personalized recommendation</SubTitle>
      {state.recommendations.length > 0 ?
      <CardWrapper>
        {state?.recommendations?.slice(0, 3).map((recommendation, index) => {
          return (
            <div key = {recommendation.title}>
            <RecommendtionCard
              video={true}
              title={recommendation.title}
              description={recommendation.excerpt}
              image={recommendation.raw.ytthumbnailurl}
              clickUri={recommendation.clickUri} 
              onClick={() => logClick(recommendation)}
              onContextMenu={() => logClick(recommendation)}
              onMouseDown={() => logClick(recommendation)}
              onMouseUp={() => logClick(recommendation)}
              sfid = {null}
            />
            </div>
          );
        })}
      </CardWrapper> : <CardWrapper>
        {skeletonArray.map((item, index) => {
          return (
            <div key = {item}>
            <SkeletonRecommendtionCard keyID={item}/>
            </div>
          );
        })}
      </CardWrapper> }
    </MainWrapper>
  );

};

const VideoRecommendation = () => {
  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: process.env.REACT_APP_API_KEY!,
      searchHub : process.env.REACT_APP_SEARCH_HUB!,
      pipeline : 'Video Rec Sidebar',

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

export default VideoRecommendation;

const MainWrapper = styled.div`
  width: 95%;
  border-radius: 24px;
  position: relative;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

