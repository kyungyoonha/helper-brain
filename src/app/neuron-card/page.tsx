"use client";
import NeuronCard from "@/components/NeuronCard";
import Layout from "@/components/Layout";
import { Image } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useUIContext } from "@/contexts";

import NeuronCardLoading from "@/components/NeuronCardLoading";

const NeuronCardPage = () => {
  const {
    neuronList,
    incorrectList,
    getNeuronListLoading,
    getNeuronList,
    getDashboard,
    dispatch,
  } = useUIContext();

  useEffect(() => {
    getNeuronList(dispatch);
    // getDashboard(dispatch);
  }, [getDashboard, getNeuronList, dispatch]);

  return (
    <Layout>
      {getNeuronListLoading ? (
        <NeuronCardLoading loading={getNeuronListLoading} repeatNumber={3} />
      ) : (
        neuronList.map((neuron) => <NeuronCard key={neuron.id} data={neuron} />)
      )}
    </Layout>
  );
};
export default NeuronCardPage;

const StyledImage = styled(Image)`
  max-width: 100%;
  min-width: 500px;
  width: calc((100vh + -325px) * 0.751503);
`;
