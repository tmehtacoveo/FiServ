import React from 'react';
import {Theme} from '../../theme';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { NavBarConfig } from '../../config/HomeConfig';


const NavBar: React.FC = ()=>{
    if(NavBarConfig.length > 0)
    {
        return <Wrapper>
            <NavigationWrapper>
                {NavBarConfig.map((item)=>{
                    return<NavigationLink key = {item.title} href={item.redirectTo}>{item.title}</NavigationLink>
                })}
            </NavigationWrapper>
        </Wrapper>
    }
    else{
        return null
    }


};

const Wrapper = styled.nav`
  height: 29px;
  width: 100%;
  background-color: ${Theme.navbar};
`

const NavigationWrapper = styled.ul`
  margin-left: 10%;
  display: inline-block;
  color : white;
  width: 20%;
  min-width: 400px;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 480px) {
    margin-left: 0px;
    padding-left: 0;
    width: 100%;
    min-width: auto;
  }
`

const NavigationLink = styled.a`
  color: ${Theme.secondaryText};
  font-size: 14px;
  margin-right: 29px;
  text-decoration: none;
  opacity: 0.8;
  transition: 0.2s ease-in-out all;
  &:hover{
    color: ${Theme.link};
    opacity: 0.5;
  }
  &.active{
    opacity: 1;
  }
`

export default NavBar;


