import React from "react";
import styled from "styled-components";
import Header from "./Header";

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
  padding: 30px;
  max-width: 700px;
`;
