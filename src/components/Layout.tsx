import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { SCREENS } from "@/configs";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header />
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 100%;
  min-width: 350px;

  @media (max-width: ${SCREENS.md}) {
    padding: 15px;
  }
`;
