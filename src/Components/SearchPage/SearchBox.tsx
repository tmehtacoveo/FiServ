import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  buildSearchBox,
  SearchBox as HeadlessSearchBox,
  SearchBoxOptions,
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );


  return (
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
        controller.submit();
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: 'auto', background: 'white'}}
      renderInput={(params) => (
        <TextField {...params} placeholder="Keresés" size="small" className='search-box'  onKeyDown={e => {
          if (e.code === 'Enter' && controller.state.value === '') {
              controller.submit();
          }
        }}/>
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);
        return (
          <li {...props}>
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
        );
      }}
    />
  );
};

const SearchBox = () => {
  const options: SearchBoxOptions = {numberOfSuggestions: 8};
  const engine = useContext(EngineContext)!;
  const controller = buildSearchBox(engine, {options});

// This is added to fix a bug which does not allow to see query suggestion on first click.  
  if(controller.state.value === ""){
    controller.updateText('');
  }
  
  return <SearchBoxRenderer controller={controller} />;
};

export default SearchBox;
