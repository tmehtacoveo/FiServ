import React,{useState} from 'react';
import {Facet as HeadlessFacet, buildFacet, FacetValue} from '@coveo/headless';

export type FacetContextType =  {
    facetController: {[x:string] : HeadlessFacet} ,
    setFacetController : (state : {[x:string] : HeadlessFacet})=> void
}


export const FacetContext = React.createContext<FacetContextType>({
    facetController : {},
    setFacetController : ()=>{}
});

const FacetControllerProvider : React.FC = ({children})=>{

    const [facetController, setFacetController] = useState<{[x:string] : HeadlessFacet}>({})

    return<FacetContext.Provider value = {{facetController, setFacetController}}>
            {children}
    </FacetContext.Provider>
};

export default FacetControllerProvider