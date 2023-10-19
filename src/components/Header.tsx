import { useUIContext } from "@/contexts";
import React from "react";
import styled from "styled-components";

const Header = () => {
  const { dashboard, neuronList } = useUIContext();
  return (
    <Wrapper>
      <div>HELPER BRAIN</div>
      <div>{`${dashboard.totalCorrectCount}/${dashboard.total}`}</div>
      <div>few</div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 65px;
  width: 100%;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 2px;
`;
