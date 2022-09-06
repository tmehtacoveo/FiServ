import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {
    buildCategoryFacet,
    CategoryFacet as HeadlessCategoryFacet,
    CategoryFacetValue,
    CategoryFacetOptions,
} from '@coveo/headless';
import EngineContext from "../../../common/engineContext";

import styled from "styled-components";

interface CategoryFacetProps {
    controller: HeadlessCategoryFacet;
}

export const CategoryFacetRenderer: FunctionComponent<CategoryFacetProps> = (props) => {
    const {controller} = props;
    const [state, setState] = useState(controller.state);

    useEffect(() => controller.subscribe(() => setState(controller.state)), []);

    function getUniqueKeyForValue(value: CategoryFacetValue) {
        return value.path.join('>');
    }


    function renderClearButton() {
        return (
            <button onClick={() => controller.deselectAll()}>All categories</button>
        );
    }

    function renderParents() {
        return (
            state.hasActiveValues && (
                <div>
                    Filtering by: {renderClearButton()}
                    {state.parents.map((parentValue, i) => {
                        const isSelectedValue = i === state.parents.length - 1;

                        return (
                            <span key={getUniqueKeyForValue(parentValue)}>
                &rarr;
                                {!isSelectedValue ? (
                                    <button onClick={() => controller.toggleSelect(parentValue)}>
                                        {parentValue.value}
                                    </button>
                                ) : (
                                    <span>{parentValue.value}</span>
                                )}
              </span>
                        );
                    })}
                </div>
            )
        );
    }

    function renderActiveValues() {
        return (
            <ul>
                {state.values.map((value) => (
                    <li key={getUniqueKeyForValue(value)}>
                        <button onClick={() => controller.toggleSelect(value)}>
                            {value.value} ({value.numberOfResults}{' '}
                            {value.numberOfResults === 1 ? 'result' : 'results'})
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

    function renderCanShowMoreLess() {
        return (
            <div>
                {state.canShowLessValues && (
                    <button onClick={() => controller.showLessValues()}>Show less</button>
                )}
                {state.canShowMoreValues && (
                    <button onClick={() => controller.showMoreValues()}>Show more</button>
                )}
            </div>
        );
    }

    if (!state.hasActiveValues && state.values.length === 0) {
        return <div>No facet values</div>;
    }

    return (
        <Wrapper>
            <li>
                {renderParents()}
                {renderActiveValues()}
                {renderCanShowMoreLess()}
            </li>
        </Wrapper>
    );
};

// usage
const CategoryFacet : FunctionComponent= ()=>{

    const engine = useContext(EngineContext)!
    const options: CategoryFacetOptions = {field: 'breadcrumbhierarchy'};
    const controller = buildCategoryFacet(engine,{options});

    return <CategoryFacetRenderer controller={controller}/>

}

export default CategoryFacet;

const Wrapper = styled.ul`
  padding: 20px 0 0;
  border-top: 1px solid #e3e4df;
  position: relative;
  font-family: inherit;
`;


/**
 * ```tsx
 * const options: CategoryFacetOptions = {field: 'breadcrumbhierarchy'};
 * const controller = buildCategoryFacet(engine, {options});
 *
 * <CategoryFacet controller={controller} />;
 * ```
 */