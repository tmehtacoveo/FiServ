import React from "react";
import HeroHome from "./HeroHome";
import styled from "styled-components";
import MainRecommendations from "./MainRecommendations";
import VideoRecommendations from "./VideoRecommendations";
import { MainRecommendationConfig, VideoRecommendationConfig } from "../config/HomeConfig";

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
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



export default HomePage;
