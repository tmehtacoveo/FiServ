import { FunctionComponent, useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  SearchBox as HeadlessSearchBox,
  StandaloneSearchBoxOptions,
  buildStandaloneSearchBox,
  buildResultList,
  ResultList,
  buildSearchBox,
  loadSearchActions,
  loadSearchAnalyticsActions,
  Suggestion,
  loadAdvancedSearchQueryActions,
  loadQueryActions,
  Result,
} from "@coveo/headless";
import EngineContext from "../../common/engineContext";
import { useNavigate } from "react-router-dom";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import styled from "styled-components";
import { ClickAwayListener, Popper } from "@mui/material";
import { Theme } from "../../theme";

interface HomeResultsSearchBoxProps {
  searchBoxController: HeadlessSearchBox;
  toggleSearchBox: () => void;
  resultListController: ResultList;
}

const HomeResultsSearchBoxRenderer: FunctionComponent<
  HomeResultsSearchBoxProps
> = (props) => {
  const { searchBoxController, resultListController } = props;
  const engine = useContext(EngineContext)!;
  const [state, setState] = useState(searchBoxController.state);
  const [resultList, setResultList] = useState<Result[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openPopper, setOpenPopper] = useState(false);

  let navigate = useNavigate();

  useEffect(
    () =>
      searchBoxController.subscribe(() => setState(searchBoxController.state)),
    [searchBoxController]
  );

  /*   useEffect(()=>{
    setSuggestions(searchBoxController.state.suggestions)
  },[searchBoxController]) */

  /*   useEffect(
    () =>
      resultListController.subscribe(() =>setResultListState(resultListController.state)),
    [resultListController]
  ); */

  /*  console.log(state.suggestions) */

  useEffect(() => {
    const unsub = setTimeout(async () => {
      const queryAction = loadQueryActions(engine);
      await engine.dispatch(
        queryAction.updateQuery({
          q: searchTerm,
          enableQuerySyntax: true,
        })
      );

      const analyticsAction = loadSearchAnalyticsActions(engine);
      const searchAction = loadSearchActions(engine);
      const searchSubmitAction = searchAction.executeSearch(
        analyticsAction.logSearchboxSubmit()
      );
      await engine.dispatch(searchSubmitAction);

      /* searchBoxController.submit() */
    }, 500);

    return () => clearTimeout(unsub);
  }, [searchTerm]);

  useEffect(() => {
    engine.subscribe(() => {
      setResultList(engine.state.search.results);
    });
  }, []);

  /* console.log(engine.state.search) */

  return (
    <MainWrapper>
      <ClickAwayListener onClickAway={()=>setOpenPopper(false)}>
        <>
     {/*  <Autocomplete
        inputValue={searchTerm}
        onInputChange={(_, newInputValue) => {
          searchBoxController.updateText(newInputValue);
          setSearchTerm(newInputValue);
        }}
        onChange={() => {
          if (searchBoxController.state.value !== "") {
            props.toggleSearchBox();
            searchBoxController.submit();
            navigate("/search");
          }
        }}
        options={state.suggestions.map((suggestion) => suggestion.rawValue)}
        freeSolo
        style={{ width: "auto"}}
        renderInput={(params) => ( */}
          <TextField
            /* {...params} */
            autoComplete="off"
            value = {searchTerm}
            onChange={(event) => {
              const newInputValue = event.target.value
              searchBoxController.updateText(newInputValue);
                setSearchTerm(newInputValue);
            }}
            onFocus = {()=>{
              setOpenPopper(true)
            }}
            onBlur = {()=>{
              setOpenPopper(false)
            }}
            className="home-search-box"
            placeholder="Search"
            size="small"
            onKeyDown={(e) => {
              if (
                e.code === "Enter" &&
                searchBoxController.state.value !== ""
              ) {
                props.toggleSearchBox();
                searchBoxController.submit();
                navigate("/search");
              }
            }}
          />
           <PopperStyledComponent   
           hidden = {!openPopper}
           style ={{
          width: '140%',
        }}
        >
          
          <PopperMainWrapper>
            <PopperQSContainer>
              {state.suggestions.map((suggestion)=>{


          const matches = match(suggestion.rawValue, searchTerm);
          const parts = parse(suggestion.rawValue, matches);
          return (
            <>
              <PopperResultListItem>
                <div onMouseDown={(event)=>{
                event.stopPropagation()
                searchBoxController.updateText(suggestion.rawValue);
                setSearchTerm(suggestion.rawValue)
                props.toggleSearchBox();
                searchBoxController.submit()
                navigate("/search");
                
                
              }}>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 400 : 300,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </PopperResultListItem>
            </>
          );
              })}

            </PopperQSContainer>
            <PopperResultsContainer>
            <ResultContainer>
        {resultList.slice(0,5).map((result, index) => {
          return <PopperResultItem>
          <PopperResultTitle href={result.clickUri} onMouseDown = {()=>{
            window.open(result.clickUri, '_blank')
          }}>{result.title}</PopperResultTitle>
          <PopperResultDescription>{result.excerpt}</PopperResultDescription>
          </PopperResultItem>;
        })}
      </ResultContainer>
            </PopperResultsContainer>
          <PopperAdContainer></PopperAdContainer>
          </PopperMainWrapper>
        </PopperStyledComponent>
        </>
        </ClickAwayListener>
    </MainWrapper>
  );
};

interface SearchBoxType {
  toggleSearchBox: () => void;
}

const HomeResultsSearchBox = ({ toggleSearchBox }: SearchBoxType) => {
  const options: StandaloneSearchBoxOptions = {
    numberOfSuggestions: 8,
    redirectionUrl: "/search",
  };
  const engine = useContext(EngineContext)!;
  const searchBoxController = buildSearchBox(engine, { options });
  const resultListController = buildResultList(engine);
  /* engine.executeFirstSearch(); */
  searchBoxController.updateText("");
  return (
    <HomeResultsSearchBoxRenderer
      resultListController={resultListController}
      searchBoxController={searchBoxController}
      toggleSearchBox={toggleSearchBox}
    />
  );
};

export default HomeResultsSearchBox;




const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  z-index: 8;
  position: relative;
`;

const PopperStyledComponent = styled.div`
  background: white;
  
  border-radius: 6px;
  box-shadow: 0px 7px 13px -2px rgba(0,0,0,0.45);
  padding: 10px;
  position: relative;
`

const PopperMainWrapper = styled.div`
  width: 100%;
  display: flex;

`

const PopperQSContainer = styled.div`
  flex: 2;
`
const PopperResultsContainer = styled.div`
  flex: 3;
  padding: 0 10px;
`

const PopperResultListItem = styled.li`
  list-style: none;
  padding: 5px 0px;
  cursor: pointer;
  &:hover{
    background-color: #D3D3D3;
  }
  &.active{
    background-color: #D3D3D3;
  }

`

const PopperResultTitle = styled.a`
  color : ${Theme.primaryText};
  font-family: 'Gibson';
  font-weight: 400;
  text-decoration: none;
cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`

const PopperResultDescription = styled.p`
  color : ${Theme.excerpt};
  font-size : 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const PopperAdContainer = styled.div`
  flex: 2;
  background: url('https://docs.citrix.com/assets/images/image-5.png') no-repeat;
`

const PopperResultItem = styled.li`
padding : 5px 0;
list-style: none;
`

const ResultContainer = styled.div``
