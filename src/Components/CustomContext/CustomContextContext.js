import React,{useContext, useEffect} from 'react';
import usePersistedState from '../../customHooks/usePersistedState';
import { InitialData } from "./SampleData";
import EngineContext from '../../common/engineContext';
import { buildContext } from '@coveo/headless';

export const CustomContextContext = React.createContext();



const CustomContextProvider = ({children})=>{

    const [profileSelected, setProfiledSelected] = usePersistedState(
        "profile_selected_v1",
        InitialData[0].name
      );
      const [ContextData, setContextData] = usePersistedState(
        "context_data_v1",
        InitialData
      );


      const engine = useContext(EngineContext);
      const controller = buildContext(engine);
    
      const settingContext = () => {
    
        const filterdProfile = ContextData.filter(
          (item) => item.name === profileSelected
        );
    
        const filterdContext = filterdProfile[0].context;
    
        let ContextSetObject = {};
    
        filterdContext.forEach((item) => {
          if (item.active && item.keyName && item.keyValue) {
            ContextSetObject[item.keyName] = item.keyValue;
          }
        });
        controller.set(ContextSetObject);
      };


      const settingContextFromEngine = (engine)=>{
        const controller = buildContext(engine);
        const filterdProfile = ContextData.filter(
          (item) => item.name === profileSelected
        );
    
        const filterdContext = filterdProfile[0].context;
    
        let ContextSetObject = {};
    
        filterdContext.forEach((item) => {
          if (item.active && item.keyName && item.keyValue) {
            ContextSetObject[item.keyName] = item.keyValue;
          }
        });
        controller.set(ContextSetObject);
      }
    
      useEffect(() => {
        settingContext();
      }, [profileSelected]);


      const getProfile = ()=>{
        const filterdProfile = ContextData.filter(
          (item) => item.name === profileSelected
        )[0];
  

        return filterdProfile;
      }


      const handleSave = () => {
        settingContext();
        window.location.reload();
      };

    return <CustomContextContext.Provider value = {{profileSelected, setProfiledSelected, ContextData, setContextData,settingContext,handleSave,getProfile,settingContextFromEngine}}>
        {children}
    </CustomContextContext.Provider>
}

export default CustomContextProvider;

