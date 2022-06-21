import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
  loadAdvancedSearchQueryActions,
  RecommendationEngine,
} from "@coveo/headless/recommendation";
import { Theme } from "../theme";
import styled from "styled-components";
import RecommendtionCardSmall, {
  SkeletonRecommendtionCardSmall,
} from "./RecommendationCardSmall";
import EngineContext from "../common/engineContext";

interface RecommendationListProps {
  controller: HeadlessRecommendationList;
  engine: RecommendationEngine;
  NumberofResults: number;
  title: string;
  video: boolean;
}

export const RecommendationListRenderer: FunctionComponent<
  RecommendationListProps
> = (props) => {
  const engine = props.engine;
  const [lastQuery, setLastQuery] = useState("");
  const MainEngine = useContext(EngineContext)!;
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  useEffect(() => {
    controller.refresh();
    controller.subscribe(() => setState(controller.state));
  }, []);

  useEffect(() => {
    if (MainEngine.state.query?.q !== lastQuery) {
      engine.dispatch(
        loadAdvancedSearchQueryActions(engine).updateAdvancedSearchQueries({
          aq: MainEngine.state.query?.q,
        })
      );
      setLastQuery(MainEngine.state.query ? MainEngine.state.query.q : "");
      controller.refresh();
      controller.subscribe(() => setState(controller.state));
    }
  }, [MainEngine.state.query]);

  if (state.error) {
    return (
      <div>
        <div>Oops {state.error.message}</div>
        {/* <code>{JSON.stringify(state.error)}</code> */}
        <button onClick={() => controller.refresh()}>Try again</button>
      </div>
    );
  }

  const logClick = (recommendation: Result) => {
    if (!engine) {
      return;
    }
    console.log("loggin");
    const { logRecommendationOpen } = loadClickAnalyticsActions(engine);
    engine.dispatch(logRecommendationOpen(recommendation));
  };

  const skeletonArray = [1, 2, 3, 4, 5];
  return (
    <MainWrapper>
      {!state.isLoading ? (
        <>
          {state.recommendations.length > 0 && (
            <>
              <Divider />
              <Title>{props.title}</Title>
              <CardWrapper>
                {state?.recommendations
                  ?.slice(0, props.NumberofResults)
                  .map((recommendation, index) => {
                    return (
                      <div key={recommendation.title}>
                        <RecommendtionCardSmall
                          video={recommendation.raw.sourcetype === "YouTube"}
                          title={recommendation.title}
                          description={recommendation.excerpt}
                          clickUri={recommendation.clickUri}
                          onClick={() => logClick(recommendation)}
                          onContextMenu={() => logClick(recommendation)}
                          onMouseDown={() => logClick(recommendation)}
                          onMouseUp={() => logClick(recommendation)}
                          image={
                            recommendation.raw.ytthumbnailurl
                              ? recommendation.raw.ytthumbnailurl
                              : ""
                          }
                        />
                      </div>
                    );
                  })}
              </CardWrapper>{" "}
            </>
          )}
        </>
      ) : (
        <>
          <Divider />
          <Title>{props.title}</Title>
          <CardWrapper>
            {skeletonArray.map((item, index) => {
              return (
                <div key={item}>
                  <SkeletonRecommendtionCardSmall keyID={item} />
                </div>
              );
            })}
          </CardWrapper>{" "}
        </>
      )}
    </MainWrapper>
  );
};

interface SearSearchSideBarRecommendationListProps {
  pipeline?: string;
  NumberofResults?: number;
  title?: string;
  video?: boolean;
}

const SearchSideBarRecommendationList: FunctionComponent<
  SearSearchSideBarRecommendationListProps
> = ({
  pipeline = "default",
  NumberofResults = 0,
  title = "",
  video = false,
}) => {
  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: process.env.REACT_APP_API_KEY!,
      searchHub: process.env.REACT_APP_SEARCH_HUB!,
      pipeline: pipeline,
    },
  });

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: "Recommendation" },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
      NumberofResults={NumberofResults}
      title={title}
      video={video}
    />
  );
};

export default SearchSideBarRecommendationList;

const Divider = styled.div`
  width: 100%;
  height: 4px;
  background: ${Theme.primary};
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const MainWrapper = styled.div`
  width: 100%;
  border-radius: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 400;
  font-family: "Gibson";
  color: ${Theme.primary};
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
  flex-direction: column;
  max-width: 1500px;
`;
