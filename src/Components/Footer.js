import React from 'react';
import styled from 'styled-components'
import { Theme } from '../theme';
import WhiteLogo from '../assets/BarcaBank.png'
const Footer = ()=>{

    return <Wrapper>
        <Logo src = {WhiteLogo} />
    </Wrapper>

};


const Wrapper = styled.div`
width: 100%;
background-color :${Theme.footer};
padding: 32px 60px;
`

const Logo = styled.img`
width: 150px;
object-fit: contain;
`


export default Footer;