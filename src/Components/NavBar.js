import React from 'react';
import {Theme} from '../theme';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { NavBarConfig } from '../config/HomeConfig';


const NavBar = ()=>{
    if(NavBarConfig.length > 0)
    {
        return <Wrapper>
        <NavigationWrapper>
            {NavBarConfig.map((item)=>{
                return<NavigationLink key = {item.title} to={item.redirectTo}>{item.title}</NavigationLink>
            })}
        </NavigationWrapper>
    </Wrapper>
    }
    else{
        return null
    }

    
};

const Wrapper = styled.nav`
height: 40px;
width: 100%;
background-color: ${Theme.navbar};
`

const NavigationWrapper = styled.ul`
margin-left: 20px;
display: flex;
color : white;
width: 25%;
min-width: 400px;
height: 40px;
justify-content: space-around;
align-items: center;

`

const NavigationLink = styled(NavLink)`
color: white;
font-size: 14px;
text-decoration: none;
opacity: 0.8;
transition: 0.2s ease-in-out all;
&:hover{
    opacity: 1;
}
&.active{
    opacity: 1;
}
`

export default NavBar;


