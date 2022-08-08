import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import HomeSearchBox from "./HomeSearchBox";
import { x } from "react-icons-kit/feather/x";
import Fade from "@mui/material/Fade";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderConfig } from "../../config/HomeConfig";
import Popover from "@mui/material/Popover";
import ContextForm from "../CustomContext/ContextForm";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import {cart} from 'react-icons-kit/icomoon/cart'
import navBar from "./NavBar";

const Header: React.FC = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {getProfile} = useContext(CustomContextContext)
  const onSearchPage = location.pathname.includes("search");
  const toggleSearchBox = () => {
    if (onSearchPage) {
      const input = document.querySelector(".search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
      return;
    }
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    if (openSearch) {
      const input = document.querySelector(".home-search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
    }
  }, [openSearch]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
      <>
        <Wrapper>
          <Logo src={Theme.companyLogo} onClick={() => navigate("/home")} />
          <RightWrapper>
            <LinkWrapper>
              {HeaderConfig.map((item) => {
                return (
                    <NavigationLink key={item.title} to={item.redirectTo}>
                      {item.title}
                    </NavigationLink>
                );
              })}
              <IconsWrapper>
                <IconContainer
                    style={{ color: Theme.headerIconColor, cursor: "pointer" }}
                    onClick={() => toggleSearchBox()}
                >
                  {openSearch && !onSearchPage ? (
                      <Icon icon={x} size={26} />
                  ) : (
                      <Icon icon={search} size={26} />
                  )}
                </IconContainer>
                <IconContainer
                    style={{ color: Theme.headerIconColor, cursor: "pointer" }}
                >
                  <Icon icon={cart} size={26} />
                </IconContainer>
                <ProfileIconContainer
                    style={{ color: Theme.headerIconColor, cursor: "pointer" }}
                    aria-describedby={id}
                    onClick={(event)=>handleClick(event)}
                >
                  <ProfileAvatar src = {getProfile().profile} alt = {'profile pic'}/>
                  <ProfileName>{getProfile().name.split(' ').slice(0, -1).join(' ')}</ProfileName>
                </ProfileIconContainer>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                >
                  <ContextForm/>
                </Popover>
              </IconsWrapper>
            </LinkWrapper>
          </RightWrapper>
        </Wrapper>
        <Fade in={openSearch && !onSearchPage}>
          <SearchContainer>
            <SearchBoxContainer>
              <HomeSearchBox toggleSearchBox={toggleSearchBox} />
            </SearchBoxContainer>
          </SearchContainer>
        </Fade>
      </>
  );
};

const Wrapper = styled.header`
  height: 72px;
  background-color: ${Theme.secondaryText};
  display: flex;
  padding: 0px 40px;
  align-items: center;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0.01em;
`;

const Logo = styled.img`
  height: 50px;
  width: 150px;
  object-fit: contain;
  &:hover {
    cursor: pointer;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;

const LinkWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

const NavigationLink = styled(Link)`
  color: ${Theme.primaryText};
  text-decoration: none;
  font-size: 24px;
  opacity: 1;
  transition: 0.2s ease-in-out all;
  margin-right: 3%;
  &:hover {
    color: ${Theme.primaryText};
    opacity: 0.5;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 150px;
  box-shadow: 0px 6px 16px ${Theme.bodyBackground};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 100px;
  position: absolute;
  background-color: white;
  justify-content: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left:auto;
`;

const IconContainer = styled.button`
  background: none;
  border: 0px;
  width: 40px;
  transition: 0.2s ease-in-out all;
  &:hover{
    transform: scale(0.95);
  }
  &:active{
    transform: scale(0.85);
  }
`

const ProfileName = styled.span`
  font-size  : 16px;
  font-weight: 400;
  font-family: inherit;
  margin-left: 15px;
  color : ${Theme.headerIconColor};
  text-overflow: ellipsis;
`


const ProfileIconContainer = styled.button`
  background: none;
  border: 0px;
  margin-left: 20px;
  width: 90px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out all;
  &:hover{
    transform: scale(0.95);
  }
  &:active{
    transform: scale(0.85);
  }

`

const SearchBoxContainer = styled.div`
  width: 50%;
  max-width: 800px;
  min-width: 500px;
  @media (max-width: 480px) {
    min-width: 80vw;
  }
`;


const ProfileAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 24px;
  object-fit: cover;
`

export default Header;
