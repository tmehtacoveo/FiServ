import React from "react";
import { Theme } from "../theme";
import HeroHome from "./HeroHome";
import styled from "styled-components";
import MainRecommendations from "./MainRecommendations";
import VideoRecommendations from "./VideoRecommendation";

const HomePage: React.FC = () => {

  return (
    <>
      <HeroHome />
      <MainWrapper>
        <MainRecommendations />
        <VideoRecommendations />
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
