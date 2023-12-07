"use client";
import NeuronCard from "@/components/NeuronCard";
import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { useUIContext } from "@/contexts";

import NeuronCardLoading from "@/components/NeuronCardLoading";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const {
    neuronList,
    getNeuronListLoading,
    getNeuronList,
    getDashboard,
    dispatch,
  } = useUIContext();

  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    getNeuronList(dispatch);
    getDashboard(dispatch);
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
