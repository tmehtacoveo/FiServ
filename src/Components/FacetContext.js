import React,{useState} from 'react';


export const FacetContext = React.createContext();

const FacetControllerProvider = ({children})=>{

    const [facetController, setFacetController] = useState(null)

    return<FacetContext.Provider value = {{facetController, setFacetController}}>
            {children}
    </FacetContext.Provider>
};

export default FacetControllerProvider