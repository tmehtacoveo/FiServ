import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {BreadcrumbManager as HeadlessBreadcrumbManager, buildBreadcrumbManager} from '@coveo/headless';
import EngineContext from '../common/engineContext';
import styled from 'styled-components';
import { Theme } from '../theme';
 
interface BreadcrumbManagerProps {
  controller: HeadlessBreadcrumbManager;
}
 
const BreadcrumbManagerRenderer: FunctionComponent<BreadcrumbManagerProps> = (
  props
) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);
 
  if (!state?.hasBreadcrumbs) {
    return null;
  }
 
  return (
    <Wrapper>
      {state.facetBreadcrumbs.map((facet) => (
        <BreadcrumbWrapper key={facet.facetId}>
          {facet.field}:{' '}
          {facet.values.map((breadcrumb) => (
            <Breadcrumb
              key={breadcrumb.value.value}
              onClick={() => breadcrumb.deselect()}
            >
              {breadcrumb.value.value}{'  '}
              <Cross>x</Cross>
            </Breadcrumb>
          ))}
        </BreadcrumbWrapper>
      ))}
    </Wrapper>
  );
};


const BreadcrumbManager = ()=>{

    const engine = useContext(EngineContext)!;
    const controller = buildBreadcrumbManager(engine)

    return <BreadcrumbManagerRenderer controller= {controller} />
}


export default BreadcrumbManager;


const Wrapper = styled.ul`
    list-style: none;
`

const BreadcrumbWrapper = styled.li`
    font-family: 'Gibson';
    width: auto;
    color : ${Theme.primaryText};
    margin-bottom: 5px;
    text-transform: capitalize;
    font-weight: 400;
`


const Breadcrumb = styled.button`
    background: none;
    border : #E5E8E8 1px solid;
    border-radius: 16px;
    padding: 0px 15px;
    margin-right: 10px;
    margin-bottom: 5px;
    font-weight: 300;
    color: #626971;
    transition: 0.1s ease-in-out all;
    cursor: pointer;
    &:hover{
        background-color: #E5E8E8;
    }
`

const Cross = styled.span`
display: inline-block;
margin-left: 5px;
color : ${Theme.primary};
width: 15px;
${Breadcrumb}:hover &{
    font-weight: 400;
}
`