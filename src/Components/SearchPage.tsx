import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import QuerySummary from "./QuerySummary";
import ResultList from "./ResultList";
import Pager from "./Pager";
import Sort from "./Sort";
import FacetList from "./FacetList";
import ResultsPerPage from "./ResultsPerPage";
import {
  SearchEngine,
} from "@coveo/headless";
import DidYouMean from "./DidyouMean";
import StaticFilterSelector from './StaticFilterSelector';

interface ISearchPageProps {
  engine: SearchEngine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
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
        <Grid item md={5} mt={6.5} mb={6.5} style = {{
          minWidth: '500px'
        }}>
          <SearchBox />
        </Grid>
      </Grid>
      <StaticFilterSelector/>
      <Container maxWidth="lg" style={{ border: "2px red solid" }}>
        <Grid item md={8.5} mt={3}>
          <DidYouMean />
        </Grid>
        <Box my={4}>
          <Grid container style={{ opacity: resultLoading ? "0.6" : "1" }}>
            <Grid item md={3} sm={12}>
              <FacetList />
            </Grid>
            <Grid item md={9} sm={12}>
              <Box pl={3}>
                <Grid container alignItems="flex-end">
                  <Grid item md={10}>
                    <QuerySummary />
                  </Grid>
                  <Grid item md={2}>
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
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SearchPage;
