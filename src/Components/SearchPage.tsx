import React, {useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchBox from './SearchBox';
import QuerySummary from './QuerySummary';
import ResultList from './ResultList';
import Pager from './Pager';
import Sort from './Sort';
import FacetList from './FacetList';
import ResultsPerPage from './ResultsPerPage';
import {buildStaticFilter, loadContextActions, SearchEngine} from '@coveo/headless';
import {EngineProvider} from '../common/engineContext';
import { buildContext, buildRecommendationEngine, buildRecommendationList, loadRecommendationActions } from '@coveo/headless/recommendation';
import DidYouMean from './DidyouMean';

interface ISearchPageProps {
  engine: SearchEngine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const {engine} = props;
  useEffect(() => {
    engine.executeFirstSearch();
  }, [engine]);


  useEffect(()=>{

    const toggling = async (controller : any)=>{
      setTimeout(()=>{
        /*  controller.toggleSelect(controller.state.values[0]) */
         controller.subscribe(() => console.log(controller.state))
      },2000)
     
    }

    const aynscfunction = async()=>{
      const recommendationEngine = buildRecommendationEngine({configuration: {
        organizationId : 'fiservg0299c4q',
        accessToken: 'xx6a51ceb9-3c7a-453f-b9eb-004ced9c6636',
        pipeline : 'Video Rec Sidebar'
      }})
  
/*       const RecAction1 = loadContextActions(engine);
  
      const RecAction2 =  RecAction1.setContext({
        contextKey : '123',
        contextValue: 'youtube'
      })
      await engine.dispatch(RecAction2)
      const RecAction3 = await loadRecommendationActions(recommendationEngine).getRecommendations()
      await recommendationEngine.dispatch(RecAction3)
       */
  
      const recController = buildRecommendationList(recommendationEngine,{
        options : {id : 'Recommendation'}
      });


    /*   recController.subscribe(() => console.log('sdasd',recController.state)) */
         /* recController.refresh(); */

         setTimeout(()=>{
         recController.refresh();
         },2000)

          /* setTimeout(()=>{
           console.log('casfas', recController)
          recController.refresh();
         },2000) */
       
         setTimeout(()=>{
          
          recController.subscribe(() => console.log('sdasd',recController.state))
         },4000) 
  
      
  
  
      const controller = buildStaticFilter(engine,{
        options: {
          id: '123',
          values: [
            {
              caption : 'Youtube',
              expression : `@source==("Investopedia","Investopedia Videos","Nerd Wallet") AND @concepts='investment'`,
              state: 'idle'
            }
          ]
        }
      } )
  
      console.log('static filter',controller.state)
     toggling(controller)
    }

    aynscfunction();

  },[])

  return (
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item md={8} mt = {6.7}>
            <SearchBox />
          </Grid>
        </Grid>
        <Grid item md={8} mt = {6.7}>
        <DidYouMean/>
        </Grid>
        <Box my={4}>
          <Grid container>
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
                <ResultList />
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
  );
};

export default SearchPage;
