"use client";

import Header from "@/components/Header";
import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [cardList, setCardList] = useState([]);

  const getCardList = async () => {
    const result = await axios.get("/api/GetNeuronList");
    if (result.data.ok) {
      setCardList(result.data.data);
    }
  };

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <Wrapper>
      <Header />

      <BodyWrapper>
        <Card title="제목" bordered={false} style={{ height: "500px" }}>
          ㄹㄷㅈfewfewfwe
        </Card>
      </BodyWrapper>
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  padding: 30px;
  width: 100%;
  flex: 1;
`;
