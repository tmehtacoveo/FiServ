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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
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
      <Autocomplete
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
        renderInput={(params) => (
          <TextField
            {...params}
            className="home-search-box"
            placeholder="Search"
            size="small"
            onKeyDown={(e) => {
              if (
                e.code === "Enter" &&
                searchBoxController.state.value !== ""
              ) {
                navigate("/search");
                props.toggleSearchBox();
                searchBoxController.submit();
              }
            }}
          />
        )}
      /*   renderOption={(props, option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);
          return (
            <>
              <li
                {...props}
              >
                <div>
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
              </li>
            </>
          );
        }} */
        PopperComponent = {(props)=> {
          return <PopperStyledComponent  {...props}  
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [100, 0],
              },
            },
          ]}
           
           style ={{
          width: '1000px',
        }}
        open = {true}
        >
          
          <PopperMainWrapper>
            <PopperQSContainer>
              {state.suggestions.map((suggestion)=>{


          const matches = match(suggestion.rawValue, searchTerm);
          const parts = parse(suggestion.rawValue, matches);
          return (
            <>
              <PopperResultListItem >
                <div onClick={(event)=>{
                  event.stopPropagation()
                searchBoxController.updateText(suggestion.rawValue);
                navigate("/search");
                searchBoxController.submit()
                
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
        {resultList.map((result, index) => {
          return <div>{result.title}</div>;
        })}
      </ResultContainer>
            </PopperResultsContainer>
          <PopperAdContainer></PopperAdContainer>
          </PopperMainWrapper>
        </PopperStyledComponent>
        }}
      />
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

const PopperStyledComponent = styled(Popper)`
  background: white;
  border-radius: 6px;
  box-shadow: 0px 7px 13px -2px rgba(0,0,0,0.45);
  padding: 10px;
`

const PopperMainWrapper = styled.div`
  width: 100%;
  display: flex;

`

const PopperQSContainer = styled.div`
  flex: 2;
  border: 1px green solid;
`
const PopperResultsContainer = styled.div`
  flex: 3;
  border: 1px blue solid;
`

const PopperResultListItem = styled.li`
  list-style: none;
  padding: 5px 0px;
  cursor: pointer;
  &:hover{
    background-color: #D3D3D3;
  }

`

const PopperAdContainer = styled.div`
  flex: 2;
  border: 1px red solid;
`

const ResultContainer = styled.div``;
