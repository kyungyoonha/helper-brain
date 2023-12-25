"use client";
import NeuronCard from "@/components/NeuronCard";
import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { useUIContext } from "@/contexts";

import NeuronCardLoading from "@/components/NeuronCardLoading";
import { useSession } from "next-auth/react";
import InputImage from "@/components/InputImage";

const HomePage = () => {
  const {
    neuronList,
    getNeuronListLoading,
    getNeuronList,
    getDashboard,
    dispatch,
  } = useUIContext();

  const { data: session } = useSession();

  useEffect(() => {
    getNeuronList(dispatch);
    getDashboard(dispatch);
    fetch("/api/get-neurons", {
      method: "GET",
    });
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

export default HomePage;
