import { FunctionComponent, useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  buildResultList,
  buildSearchBox,
  SearchBox as HeadlessSearchBox,
  SearchBoxOptions,
  ResultList as HeadlessResultList,
} from "@coveo/headless";
import EngineContext from "../../common/engineContext";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

interface FeaturedResultSearchBoxProps {
  SearchBoxcontroller: HeadlessSearchBox;
  ResultListController: HeadlessResultList;
}

const FeaturedResultSearchBoxRenderer: FunctionComponent<
  FeaturedResultSearchBoxProps
> = (props) => {
  const { SearchBoxcontroller, ResultListController } = props;
  const [state, setState] = useState(SearchBoxcontroller.state);
  const [resultListState, setResultListState] = useState(ResultListController.state);

  useEffect(
    () =>
      ResultListController.subscribe(() =>setResultListState(ResultListController.state)),
    [ResultListController]
  );

  useEffect(
    () =>
      SearchBoxcontroller.subscribe(() => setState(SearchBoxcontroller.state)),
    [SearchBoxcontroller]
  );

  console.log(resultListState.results)

  return (
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        SearchBoxcontroller.updateText(newInputValue);
      }}
      onChange={() => {
        SearchBoxcontroller.submit();
      }}
      options={resultListState.results.map((result) => result.uniqueId)}
      freeSolo
      style={{ width: "auto", background: "white" }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          size="small"
          className="search-box"
          onKeyDown={(e) => {
            if (e.code === "Enter" && SearchBoxcontroller.state.value === "") {
              SearchBoxcontroller.submit();
            }
          }}
        />
      )}
     /*  renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);
        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                  <>
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 400 : 300,
                  }}
                >
                  {part.text}
                </span>
                </>
              ))}
            </div>
          </li>
        );
      }} */
    />
  );
};

const FeaturedResultSearchBox = () => {
  const options: SearchBoxOptions = { numberOfSuggestions: 8 };
  const engine = useContext(EngineContext)!;
  const SearchBoxcontroller = buildSearchBox(engine, { options });
  const ResultListController = buildResultList(engine);

  // This is added to fix a bug which does not allow to see query suggestion on first click.
  if (SearchBoxcontroller.state.value === "") {
    SearchBoxcontroller.updateText("");
  }
  return (
    <FeaturedResultSearchBoxRenderer
      SearchBoxcontroller={SearchBoxcontroller}
      ResultListController={ResultListController}
    />
  );
};

export default FeaturedResultSearchBox;
