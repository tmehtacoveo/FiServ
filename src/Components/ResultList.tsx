import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import List from '@mui/material/List';
import {ListItem, Box, Typography} from '@mui/material';
import {
  buildResultList,
  Result,
  buildResultTemplatesManager,
  ResultTemplatesManager,
  ResultList as HeadlessResultList,
  buildInteractiveResult,
  SearchEngine,
  ResultTemplatesHelpers,
} from '@coveo/headless';
import EngineContext from '../common/engineContext';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { SFKBContext } from './SFKBContext';
import { FieldToIncludesInSearchResults, ResultTemplateConfig } from '../config/SearchConfig';

type Template = (result: Result) => React.ReactNode;

export function filterProtocol(uri: string) {
  // Filters out dangerous URIs that can create XSS attacks such as `javascript:`.
  const isAbsolute = /^(https?|ftp|file|mailto|tel):/i.test(uri);
  const isRelative = /^(\/|\.\/|\.\.\/)/.test(uri);

  return isAbsolute || isRelative ? uri : '';
}

interface FieldValueInterface {
  value: string;
  caption: string;
}

interface ResultListRendererProps {
  controller: HeadlessResultList;
  setResultLoading : (x: boolean)=>void
}
function ListItemLink(engine: SearchEngine, result: Result,source? : string, setResult? : (x: Result)=>void) {
  const interactiveResult = buildInteractiveResult(engine, {
    options: {result},
  });
  return (
    <>
    {source === 'Salesforce KB'?
    <Link to = {`/salesforcekb/${result.raw.sfid}`}
      onClick={() => {
        if(setResult){
          setResult(result)
        }
        interactiveResult.select()}}
     /*  onContextMenu={() => interactiveResult.select()} */
    /*   onMouseDown={() => interactiveResult.select()}
      onMouseUp={() => interactiveResult.select()} */
      onTouchStart={() => interactiveResult.beginDelayedSelect()}
      onTouchEnd={() => interactiveResult.cancelPendingSelect()}
    >
      <Typography variant="body1" color="primary">
        {result.title}
      </Typography>
    </Link> : <a
      href={filterProtocol(result.clickUri)}
      target="_blank" rel="noopener noreferrer"
      onClick={() => interactiveResult.select()}
      onContextMenu={() => interactiveResult.select()}
      onMouseDown={() => interactiveResult.select()}
      onMouseUp={() => interactiveResult.select()}
      onTouchStart={() => interactiveResult.beginDelayedSelect()}
      onTouchEnd={() => interactiveResult.cancelPendingSelect()}
    >
      <Typography variant="body1" color="primary">
        {result.title}
      </Typography>
    </a>}
    </>
  );
}

function FieldValue(props: FieldValueInterface) {
  return (
    <Box>
      <Typography
        color="textSecondary"
        style={{fontWeight: 'bold'}}
        variant="caption"
      >
        {props.caption}:&nbsp;
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {props.value}
      </Typography>
    </Box>
  );
}

const ResultListRenderer: FunctionComponent<ResultListRendererProps> = (props) => {
  
  const {controller,setResultLoading} = props;
  const engine = useContext(EngineContext)!;
  const [state, setState] = useState(controller.state);
  const headlessResultTemplateManager: ResultTemplatesManager<Template> =
    buildResultTemplatesManager(engine);
  headlessResultTemplateManager.registerTemplates(...ResultTemplateConfig)
  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  useEffect(()=>{
    if(state.isLoading)
    {
      setResultLoading(true);
    }
    else{
      setResultLoading(false)
    }
  },[state])

  return (
    <List>
      {state.results.map((result: Result) => {
        const template = headlessResultTemplateManager.selectTemplate(result);
        return <React.Fragment key = {result.uniqueId}> {template ? template(result) : null} </React.Fragment>;
      })}
    </List>
  );
};

interface ResultListProps {
  setResultLoading : (x: boolean)=>void
}

const ResultList:FunctionComponent<ResultListProps> = ({setResultLoading}) => {
  const engine = useContext(EngineContext)!;
  const controller = buildResultList(engine,{
    options : { fieldsToInclude: FieldToIncludesInSearchResults}
  });
  return <ResultListRenderer controller={controller} setResultLoading={setResultLoading} />;
};

export default ResultList;
