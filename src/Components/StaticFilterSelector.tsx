import {useEffect, useState, FunctionComponent, useContext} from 'react';
import { buildStaticFilter, StaticFilter} from '@coveo/headless';
import EngineContext from '../common/engineContext';
import styled from 'styled-components';
import { Theme } from "../theme";

interface StaticFIlterSelectorType {
    controller : StaticFilter
}

 
export const StaticFilterRenderer: FunctionComponent<StaticFIlterSelectorType> = (props) => {
const {controller} = props
const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);


  return (
      <>
      <Wrapper>
      {state.values.map((value) => {
        return (
          <Filter key={value.caption} onClick={()=>{
            controller.toggleSingleSelect(value)
          }}
          isActive = {value.state === 'selected'}
          >
            {value.caption}
          </Filter>
        );
      })}
      </Wrapper>
    </>
  );
};


const StaticFilterSelector: FunctionComponent = ()=>{

    const engine = useContext(EngineContext)!;

    const controller = buildStaticFilter(engine,{
        options: {
          id: 'searchpage-static-filter',
          values: [
            {
              caption : 'Investing',
              expression : `@source==("Investopedia","Investopedia Videos","Nerd Wallet") AND @concepts='investment'`,
              state: 'idle'
            },
            {
                caption : 'Money Matters',
                expression : `@source==("Nerd Wallet","Credit Cards","Bankrate","Insurance Advice")`,
                state: 'idle'
            },
            {
                caption : 'Insurance Needs',
                expression : `@source==("Insurance Information","Insurance Advice","Policy Genius","Nerd Wallet") AND @concepts='insurance'`,
                state: 'idle'
            },
            {
                caption : 'Banking Info',
                expression : `@source==("Bankrate")`,
                state: 'idle'
            },
            {
                caption : 'Advisor',
                expression : `@source==("Advisor")`,
                state: 'idle'
            },
            {
                caption : 'Youtube',
                expression : `@filetype=="youtubevideo"`,
                state: 'idle'
            }
        ]
        }
      } )

    return <StaticFilterRenderer controller = {controller}/>
}


const Wrapper = styled.div`
    width: 100%;
    padding: 0px 10%; 
    background: ${Theme.navbar};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Gibson;
    font-weight: 300;
`

const Filter = styled.a<{isActive : boolean}>`
    padding: 15px 20px;
    text-align: center;
    color : ${Theme.secondary};
    cursor: pointer;
    background: ${props => props.isActive? Theme.selection : null};
    opacity: ${props => props.isActive? 1 : 0.8};
    transition: 0.2s ease-in-out all;
    &:hover{
        opacity: 1;
    }
    

`

export default StaticFilterSelector;