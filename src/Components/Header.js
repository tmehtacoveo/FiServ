import React,{useState} from "react";
import { Theme } from "../theme";
import styled from "styled-components";
import bankLogo from "../assests/ChanceBank.png";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import { user } from "react-icons-kit/feather/user";
import HomeSearchBox from "./HomeSearchBox";
import {x} from 'react-icons-kit/feather/x'
import Fade from '@mui/material/Fade';
import { useLocation, useNavigate } from "react-router-dom"

const Header = () => {
    const [openSearch, setOpenSearch] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const closeSearchBox = ()=>{
      setOpenSearch(!openSearch)
    }

  const onSearchPage = !location.pathname === '/search'

  return (
    <>
      <Wrapper>
        <Logo src={bankLogo} onClick = {()=>navigate('/home')} />
        <RightWrapper>
          <LinkWrapper>
            <NavigationLink to="/">Bank Account</NavigationLink>
            <NavigationLink to="/">Credit Card</NavigationLink>
            <NavigationLink to="/">Mortages</NavigationLink>
            <NavigationLink to="/">Investment</NavigationLink>
            <NavigationLink to="/">Insurance</NavigationLink>
            <Divider></Divider>
            <div style={{ color: "grey", cursor: "pointer" }} onClick={()=>closeSearchBox()}>
              {openSearch && !onSearchPage?<Icon icon={x} size={24} /> : <Icon icon={search} size={24} />}
            </div>
            <div style={{ color: "grey", cursor: "pointer" }}>
              <Icon icon={user} size={24} />
            </div>
          </LinkWrapper>
        </RightWrapper>
      </Wrapper>
      <Fade in={openSearch && !onSearchPage}>
      <SearchContainer>
          <div style = {{width : '50%'}}>
        <HomeSearchBox closeSearchBox = {closeSearchBox} />
        </div>
      </SearchContainer>
      </Fade>
    </>
  );
};

const Wrapper = styled.header`
  height: 80px;
  background-color: ${Theme.secondary};
  display: flex;
  padding: 0px 40px;
  align-items: center;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  font-family: "Gibson";
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: 0.01em;
`;

const Logo = styled.img`
  height: 50px;
  width: 150px;
  object-fit: contain;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const LinkWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

const NavigationLink = styled(Link)`
  color: ${Theme.primary};
  text-decoration: none;
  font-size: 16px;
  opacity: 1;
  transition: 0.2s ease-in-out all;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Divider = styled.div`
  height: 50px;
  border-right-width: 2px;
  width: 1px;
  height: 48px;

  /* Primary/Grey/40 */

  background: #e5e8e8;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 150px;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 100px;
  position: absolute;
  background-color: white;
  justify-content: center;
`;

export default Header;
