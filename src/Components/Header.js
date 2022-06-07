import React from 'react';
import {Theme} from '../theme';
import styled from "styled-components";
import bankLogo from '../assests/ChanceBank.png'
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import {search} from 'react-icons-kit/feather/search'
import {user} from 'react-icons-kit/feather/user'

const Header = ()=>{
    

    return <Wrapper>
        <Logo src ={bankLogo} />
        <RightWrapper>
        <LinkWrapper>
            <NavigationLink to= '/'>Bank Account</NavigationLink>
            <NavigationLink to= '/'>Credit Card</NavigationLink>
            <NavigationLink to= '/'>Mortages</NavigationLink>
            <NavigationLink to= '/'>Investment</NavigationLink>
            <NavigationLink to= '/'>Insurance</NavigationLink>
            <Divider></Divider>
            <div style={{ color: 'grey' }}>
            <Icon icon={search} size={24}/>
            </div>
            <div style={{ color: 'grey' }}>
            <Icon icon={user} size = {24}/>
            </div>
        </LinkWrapper>

        </RightWrapper>
    </Wrapper>
};


const Wrapper = styled.header`
height: 80px;
background-color: ${Theme.secondary};
display: flex;
padding:0px 40px;
align-items: center;
box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);

`

const Logo = styled.img`
height: 50px;
width: 150px;
object-fit: contain;
`

const RightWrapper = styled.div`
display: flex;
justify-content: flex-end;
flex: 1;
`

const LinkWrapper = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
width: 700px;
`

const NavigationLink = styled(Link)`
color : ${Theme.primary};
text-decoration: none;
font-size: 14px;
`

const Divider = styled.div`

height: 50px;
border-right-width: 2px;
width: 1px;
height: 48px;

/* Primary/Grey/40 */

background: #E5E8E8;

`


export default Header;