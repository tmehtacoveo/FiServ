import {FunctionComponent, useEffect, useState, useContext, memo} from 'react';
import {Facet as HeadlessFacet, buildFacet, FacetValue} from '@coveo/headless';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import './Facet.css';
import {Divider, ListItem, ListItemText, Typography} from '@mui/material';
import EngineContext from '../common/engineContext';
import { FacetContext, FacetContextType } from './FacetContext';
import styled from 'styled-components'
interface FacetProps {
  title: string | undefined;
  field: string;
}

interface FacetRendererProps extends FacetProps {
  controller: HeadlessFacet;
}

const FacetRenderer: FunctionComponent<FacetRendererProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const toggleSelect = (value: FacetValue) => {
    controller.toggleSelect(value);
  };

  const showMore = () => {
    controller.showMoreValues();
  };

  const showLess = () => {
    controller.showLessValues();
  };

  return (
    <Wrapper>
    <Box mb={0} mr={3} p={1} >
      <Box pb={1}>
        <Typography variant="h6" component="h6">
          {props.title}
        </Typography>
      </Box>
      <Divider />
      <List dense>
        {state.values.map((value: FacetValue) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              style={{padding: 0}}
              key={value.value}
              role={undefined}
              button
              onClick={() => toggleSelect(value)}
            >
              <Checkbox
                size="small"
                edge="start"
                checked={controller.isValueSelected(value)}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': labelId}}
              />
              <ListItemText
                className="truncate inline"
                primary={`${value.value}`}
                secondary={`(${value.numberOfResults})`}
              />
            </ListItem>
          );
        })}
      </List>
      {state.canShowLessValues && (
        <Button size="small" onClick={() => showLess()}>
          Show Less
        </Button>
      )}
      {state.canShowMoreValues && (
        <Button size="small" onClick={() => showMore()}>
          Show More
        </Button>
      )}
    </Box>
    </Wrapper>
  );
};

const Facet: FunctionComponent<FacetProps> = (props) => {
 const {facetController, setFacetController} = useContext<any>(FacetContext)!
  const engine = useContext(EngineContext)!;
  
  let controller : HeadlessFacet  = facetController[props.field]? facetController[props.field] : buildFacet(engine, {
      options: {
        numberOfValues: 5,
        field: props.field,
      },
    });

    useEffect(()=>{
      if(!facetController[props.field]){
        const update =<T,> (prev : T): T=>{
          return {...prev, [props.field] : controller}
        }

        setFacetController(update);
      }
    },[])

    console.log(facetController)
    
  return <FacetRenderer {...props} controller={facetController[props.field]? facetController[props.field] : controller} />;
};

export default memo(Facet);


const Wrapper = styled.div`
  
  border: 1px #E5E8E8 solid;
  border-radius: 16px;
  padding: 24px 16px;
  margin-bottom: 20px;
  font-family: 'Gibson';
`