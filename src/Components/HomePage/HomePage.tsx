import React from "react";
import HeroHome from "./HeroHome";
import styled from "styled-components";
import MainRecommendations from "../Recommendations/MainRecommendations";
import VideoRecommendations from "../Recommendations/VideoRecommendations";
import { MainRecommendationConfig, VideoRecommendationConfig } from "../../config/HomeConfig";
import {Theme} from "../../theme";

const HomePage: React.FC = () => {

  return (
    <>
      <HeroHome />
      <MainWrapper>
        {Object.keys(MainRecommendationConfig).length !== 0 &&  <MainRecommendations />}
        {Object.keys(VideoRecommendationConfig).length !== 0 && <VideoRecommendations />}
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  background-color: ${Theme.bodyBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
`;



export default HomePage;
