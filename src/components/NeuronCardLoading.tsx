import { MehFilled, StarFilled } from "@ant-design/icons";
import { Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

interface Props {
  loading: boolean;
  repeatNumber: number;
}

const NeuronCardLoading = ({ loading, repeatNumber }: Props) => {
  return (
    <>
      {[...new Array(repeatNumber)].fill("").map((item, idx) => (
        <Card
          key={idx}
          style={{ width: 600, marginTop: 16 }}
          actions={[<MehFilled key="close" />, <StarFilled key="star" />]}
        >
          <Skeleton loading={loading} active>
            <Meta title="Card title" description="This is the description" />
          </Skeleton>
        </Card>
      ))}
    </>
  );
};

export default NeuronCardLoading;
