import React,{useState} from "react";
import styled from "styled-components";
import classes from './ContextDataTable.module.css'
import {trash2} from 'react-icons-kit/feather/trash2'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'

const ContextDataTable = ({ContextData, profileSelected, setContextData}) => {

    const FilteredProfileContext = ContextData.filter((item)=> item.name === profileSelected)
    const handleInput = (e, index)=>{

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
        
    setContextData(prev => {
            const indexOF = prev.findIndex((item)=> item.name === profileSelected)
            prev[indexOF].context[index][name] = value;
            return [...prev];
        })

    }

    console.log(ContextData)

    const handleNewRow = ()=>{

        setContextData(prev => {
            const indexOF = prev.findIndex((item)=> item.name === profileSelected)
            prev[indexOF].context.push({
            active: false,
            keyName: "",
            keyValue: "",
            customQRF: false,
            })
            return [...prev];
        })

    }

    const handleDelete = (ev, index)=>{

        setContextData(prev => {
            const indexOF = prev.findIndex((item)=> item.name === profileSelected)
            prev[indexOF].context.splice(index,1) 
            return [...prev];
        })
    }


  return (
    <Wrapper>

      <table style={{ width: "100%" }} className = {classes.table}>
        <thead>
          <tr>
            <th>
              <Title>Active</Title>
            </th>
            <th>
              <Title>Key Name</Title>
            </th>
            <th>
              <Title>Key Value</Title>
            </th>
            <th>
              <Title>Custom QRF</Title>
            </th>
            <th>
              
            </th>
          </tr>
          {/* <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>
              <Input type="string" />
            </th>
            <th>
              <Input type="string" />
            </th>
            <th>
              <input type="checkbox" />
            </th>
          </tr> */}
        </thead>
        <tbody>
            {FilteredProfileContext[0].context.length >0? 
            <>
          {FilteredProfileContext[0].context.map((item, index) => {
            return (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name = 'active'
                    checked={item.active}
                    onChange = {(ev)=>handleInput(ev,index)}
                  />
                </td>
                <td>
                  <Input type="string" name = 'keyName' value={item.keyName} onChange = {(ev)=>handleInput(ev,index)}/>
                </td>
                <td>
                  <Input type="string" name = 'keyValue' value={item.keyValue} onChange = {(ev)=>handleInput(ev,index)}/>
                </td>
                <td>
                  <input
                    type="checkbox" 
                    name = 'customQRF'
                    checked={item.customQRF}
                    onChange = {(ev)=>handleInput(ev,index)}
                  />
                </td>
                <td>
                  <Icon icon ={trash2} onClick={(ev)=>handleDelete(ev,index)}/>
                </td>
              </tr>
            );
          })}
          </> : null}
        </tbody>
      </table>
      <Icon icon ={plus} size={32} style = {{marginTop: '20px', border: '2px black solid', borderRadius : '20px', cursor:'pointer'}} onClick={handleNewRow}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 95%;
  padding: 20px;
  /* height: 200px; */
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: 300;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 400;
`;

export default ContextDataTable;
