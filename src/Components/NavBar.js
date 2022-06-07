import React from 'react';
import {Theme} from '../theme';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';


const NavBar = ()=>{

    return <Wrapper>
        <NavigationWrapper>
            <NavigationLink to='/home'>Personal</NavigationLink>
            <NavigationLink to='/'>Business</NavigationLink>
            <NavigationLink to='/'>Commerical</NavigationLink>
            <NavigationLink to='/'>About</NavigationLink>
        </NavigationWrapper>
    </Wrapper>
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
&.active{
    opacity: 1;
}
`

export default NavBar;


