import React from "react";
import styled from "styled-components";
import { Theme } from "../../theme";


const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Logo src={Theme.companyLogo} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${Theme.footer};
  padding: 32px 60px;
`;

const Logo = styled.img`
  width: 65px;
  object-fit: contain;
`;

export default Footer;
