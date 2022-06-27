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
        <Grid
          item
          md={5}
          mt={6.5}
          mb={6.5}
          style={{
            minWidth: "500px",
            maxWidth: "800px",
          }}
        >
          <SearchBox />
        </Grid>
      </Grid>
      <SearchTabs filterSelected={filter? filter : ""} />
      <Container maxWidth="xl" style={{ padding: "0px" }}>
        <Grid item md={8.5} mt={3}>
          <DidYouMean />
        </Grid>
        <Box my={4}>
          <Grid container style={{ opacity: resultLoading ? "0.6" : "1" }}>
            <Grid item xs={3} md={3} sm={12}>
              <FacetList />
            </Grid>
            <Grid item xs={6} md={6} sm={12}>
              <Box pl={3}>
                <Grid container alignItems="flex-end">
                  <Grid item md={9.5}>
                    <QuerySummary />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sx={{ position: "relative", left: "-50px" }}
                  >
                    <Sort />
                  </Grid>
                </Grid>
                <ResultList setResultLoading={setResultLoading} />
              </Box>
              <Box my={4}>
                <Grid container>
                  <Grid item md={6}>
                    <Pager />
                  </Grid>
                  <Grid item md={6}>
                    <ResultsPerPage />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3} md={3} sm={12}>
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
                                    pipeline={item?.pipeline}
                                    NumberofResults={item?.NumberofResults}
                                    title={item?.title}
                                    video={item?.video}
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
