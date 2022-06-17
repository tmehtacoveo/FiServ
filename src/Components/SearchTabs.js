import React, { useEffect, useState, FunctionComponent, useContext } from "react";
import { buildTab } from "@coveo/headless";
import EngineContext from "../common/engineContext";
import styled from "styled-components";
import { Theme } from "../theme";
import { useNavigate } from "react-router-dom";

const TAB_LIST = [
  {
    caption: "All Content",
    expression: "",
    isActive: true,
  },
  {
    caption: "Investing",
    expression: `@source==("Investopedia","Investopedia Videos","Nerd Wallet") AND @concepts='investment'`,
    isActive: false,
  },
  {
    caption: "Money Matters",
    expression: `@source==("Nerd Wallet","Credit Cards","Bankrate","Insurance Advice")`,
    isActive: false,
  },
  {
    caption: "Insurance Needs",
    expression: `@source==("Insurance Information","Insurance Advice","Policy Genius","Nerd Wallet") AND @concepts='insurance'`,
    isActive: false,
  },
  {
    caption: "Banking Info",
    expression: `@source==("Bankrate")`,
    isActive: false,
  },
  {
    caption: "Advisor",
    expression: `@source==("Advisor")`,
    isActive: false,
  },
  {
    caption: "Youtube",
    expression: `@filetype=="youtubevideo"`,
    isActive: false,
  },
];

const isRouteMatching = (param, caption) => {
  if (!param && caption === TAB_LIST[0].caption) {
    return true;
  }

  return (
    param && caption.replace(/\s/g, "").toLowerCase() === param.toLowerCase()
  );
};

export const SearchTab = ({ controller, item, selected }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      controller.select();
    }
  }, []);

  return (
    <Tab
      key={item.caption}
      onClick={() => {
        navigate(`/search/${item.caption.replace(/\s/g, "")}`);
        if (!selected) {
          controller.select();
        }
      }}
      isActive={selected}
    >
      {item.caption}
    </Tab>
  );
};

const SearchTabs = ({ filterSelected }) => {
  const engine = useContext(EngineContext);

  return (
    <Wrapper>
      {TAB_LIST.map((item) => {
        const controller = buildTab(engine, {
          options: {
            id: item.caption,
            expression: item.expression,
          },
        });

        return (
          <React.Fragment key = {item.caption}>
          <SearchTab
            item={item}
            controller={controller}
            selected={isRouteMatching(filterSelected, item.caption)}
          ></SearchTab>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0px 10%;
  background: ${Theme.navbar};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Gibson;
  font-weight: 300;
`;

const Tab = styled.a`
  padding: 15px 20px;
  text-align: center;
  color: ${Theme.secondary};
  cursor: pointer;
  background: ${(props) => (props.isActive ? Theme.selection : null)};
  opacity: ${(props) => (props.isActive ? 1 : 0.8)};
  transition: 0.2s ease-in-out all;
  &:hover {
    opacity: 1;
  }
`;

export default SearchTabs;
