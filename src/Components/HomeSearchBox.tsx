import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  buildSearchBox,
  SearchBox as HeadlessSearchBox,
  SearchBoxOptions,
} from '@coveo/headless';
import EngineContext from '../common/engineContext';
import { useNavigate } from 'react-router-dom';

interface SearchBoxProps {
  controller: HeadlessSearchBox;
  closeSearchBox : ()=>void;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
  let navigate = useNavigate();

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
    /*   onChange={() => {
          if (controller.state.value !== '')
          {
            navigate('/search');
            props.closeSearchBox();
            controller.submit();
          }
      }} */
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: 'auto'}}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search" size="small" onKeyDown={e => {
            if (e.code === 'Enter' && controller.state.value !== '') {
                navigate('/search');
                props.closeSearchBox();
                controller.submit();
            }
          }}/>
      )}
    />
  );
};

interface  SearchBoxType {
    closeSearchBox : ()=>void
}

const SearchBox = ({closeSearchBox}: SearchBoxType) => {
  const options: SearchBoxOptions = {numberOfSuggestions: 8};
  const engine = useContext(EngineContext)!;
  const controller = buildSearchBox(engine, {options});
  controller.updateText('');
  return <SearchBoxRenderer controller={controller} closeSearchBox = {closeSearchBox} />;
};

export default SearchBox;
