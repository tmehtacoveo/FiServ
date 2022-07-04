import React, { useState } from "react";
import {  Result } from "@coveo/headless";


export const QuickViewModalContext = React.createContext<{ result: any, openModal : boolean, setResult : (x : Result)=>void, setOpenModal : (x : boolean)=>void }>({
  result : {},
  openModal : false,
  setResult : ()=>{},
  setOpenModal : ()=>{}
});

const QuickViewModalProvider: React.FC = ({ children }) => {
  const [result, setResult] = useState<any>({});
  const [openModal,setOpenModal] = useState(false);

  return (
    <QuickViewModalContext.Provider value={{ result, openModal, setResult, setOpenModal }}>
      {children}
    </QuickViewModalContext.Provider>
  );
};

export default QuickViewModalProvider;
