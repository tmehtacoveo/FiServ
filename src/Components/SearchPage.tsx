import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import QuerySummary from "./QuerySummary";
import ResultList from "./ResultList";
import Pager from "./Pager";
import Sort from "./Sort";
import FacetList from "./Facet/FacetList";
import ResultsPerPage from "./ResultsPerPage";
import { SearchEngine } from "@coveo/headless";
import DidYouMean from "./DidyouMean";
import SearchSideBarRecommendationList from "./SearchSideBarRecommendationList";
import { useParams } from "react-router-dom";
import SearchTabs from "./SearchTabs";
import {
  DefaultSideBarRecommendationConfig,
  SearchPageTabConfig,
} from "../config/SearchConfig";
import BreadcrumbManager from "./BreadcrumbManager";
import styled from 'styled-components'

interface ISearchPageProps {
  engine: SearchEngine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { filter } = useParams();
  const { engine } = props;
  const [resultLoading, setResultLoading] = useState(false);
  useEffect(() => {
    engine.executeFirstSearch();
  }, [engine]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{
          background: "#F6F7F9",
        }}
      >
        {/* <Grid
          item
          md={0}
          mt={6.5}
          mb={6.5}
        > */}
          <SearchBoxContainer>
          <SearchBox />
          </SearchBoxContainer>
        {/* </Grid> */}
      </Grid>
      <SearchTabs filterSelected={filter? filter : ""} />
      <Container maxWidth="xl" style={{ padding: "0px" }}>
        <Grid item mt={3} mb={2}>
          <DidYouMean />
          <BreadcrumbManager/>
        </Grid>
        <Box my={2}>
          <Grid container style={{ opacity: resultLoading ? "0.6" : "1" }}>
            <Grid item xs={12} md={3} sm={12}>
              <FacetList />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Box pl={3} pr={2}>
                <Grid container alignItems="flex-end">
                  <Grid item md={9} xs ={12} mb={2}>
                    <QuerySummary />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    xs ={12}
                    mb={2}
                  >
                    <Sort />
                  </Grid>
                </Grid>
                <ResultList setResultLoading={setResultLoading} />
              </Box>
              <Box my={4}>
                <Grid container>
                  <Grid item md={6} ml = {2} mb={2}>
                    <Pager />
                  </Grid>
                  <Grid item md={5} ml = {2}>
                    <ResultsPerPage />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sm={12}>
              {DefaultSideBarRecommendationConfig.length > 0? (
                <>
                  {DefaultSideBarRecommendationConfig.map((item) => {
                    return (
                      <React.Fragment key={item.title}>
                        <SearchSideBarRecommendationList
                          pipeline={item?.pipeline}
                          NumberofResults={item?.NumberofResults}
                          title={item?.title}
                          video={item?.video}
                        />
                      </React.Fragment>
                    );
                  })}
                </>
              ) : (
                <>
                  {SearchPageTabConfig.map((tab, index) => {
                    if (
                      (filter?.toLowerCase() ===
                        tab.caption.replace(/\s/g, "").toLowerCase() ||
                        (index === 0 && filter === undefined)) &&
                      tab.sideBarRecommendationConfig
                    ) {
                      return (
                        <React.Fragment key={tab.caption}>
                          <>
                            {tab.sideBarRecommendationConfig.map((item) => {
                              return (
                                <React.Fragment key={item.title}>
                                  <SearchSideBarRecommendationList
                                    pipeline={item.pipeline}
                                    NumberofResults={item.NumberofResults}
                                    title={item.title}
                                    video={item.video}
                                  />
                                </React.Fragment>
                              );
                            })}
                          </>
                        </React.Fragment>
                      );
                    }
                  })}
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SearchPage;


const SearchBoxContainer = styled.div`
  width: 50%;
  max-width: 800px;
  min-width: 500px;
  padding: 50px 0px;
  @media (max-width: 480px) {
  min-width: 80vw;
}
`