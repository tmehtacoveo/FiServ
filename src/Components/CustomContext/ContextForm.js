import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styled from "styled-components";
import ProfileSelector from "./ProfileSelector";
import ContextDataTable from './ContextDataTable';
import { InitialData } from "./SampleData";
  
const ContextForm = () => {

   const [profileSelected, setProfiledSelected] = useState(InitialData[0].name)
   const [ContextData, setContextData] = useState(InitialData);

  return (
    <Wrapper>
      <h4>Profile Selector</h4>
      <ProfileSelector setProfiledSelected={setProfiledSelected} profileSelected = {profileSelected} ContextData={ContextData}/>
      <h4>Context</h4>
      <ContextDataTable profileSelected = { profileSelected} setContextData = {setContextData} ContextData={ContextData}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  width: 700px;
  height: 600px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  /* justify-content: space-around; */
`;


export default ContextForm;
