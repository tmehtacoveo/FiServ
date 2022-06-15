import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {StaticFilterOptions, buildStaticFilter, buildQueryExpression} from '@coveo/headless';
import EngineContext from '../common/engineContext';


 
export const StaticFilterRenderer: FunctionComponent<StaticFilterOptions> = (props) => {

  const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);
 
  return (
    <ul>
      {state.values.map((value) => {
        return (
          <li key={value.caption}>
            <input
              type="checkbox"
              checked={controller.isValueSelected(value)}
              onChange={() => controller.toggleSelect(value)}
            />
            <span>{value.caption}</span>
          </li>
        );
      })}
    </ul>
  );
};


const StaticFilterSelector: FunctionComponent = ()=>{

    const engine = useContext(EngineContext)!;

    const youtubeExpression = buildQueryExpression()
    .addStringField({
      field: 'filetype',
      operator: 'isExactly',
      values: ['youtubevideo'],
    })
    .toQuerySyntax();


    const controller = buildStaticFilter(engine!, {options: props});

    return <StaticFilterRenderer/>
}