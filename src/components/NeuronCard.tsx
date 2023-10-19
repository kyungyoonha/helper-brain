import React, { useState } from "react";
import styled from "styled-components";
import { Card, Tag } from "antd";
import {
  QuestionCircleFilled,
  SettingOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import Image from "next/image";
import { Neuron } from "@/types";
import NeuronAnswerCard from "./NeuronAnswerCard";
import { useUIContext } from "@/contexts";
import { SCREENS } from "@/configs";

interface Props {
  data: Neuron;
}

const NeuronCard = ({ data }: Props) => {
  const {
    question_text,
    question_url,
    star,
    category1,
    category2,
    category3,
    answer1_text,
    answer1_url,
    answer2_text,
    answer2_url,
    answer3_text,
    answer3_url,
  } = data;
  const [isOpen, setIsOpen] = useState(false);
  const { updateNeuronCorrect, updateNeuronIncorrect, dispatch } =
    useUIContext();

  const onClickNeuronCorrect = (neuron: Neuron) => () => {
    updateNeuronCorrect(dispatch, neuron);
  };
  const onClickNeuronIncorrect = (neuron: Neuron) => () => {
    setIsOpen(true);
    updateNeuronIncorrect(dispatch, neuron);
  };

  return (
    <Wrapper>
      <Card
        title={
          <StyledTitle>
            <div>
              {category1 && <Tag color="#f50">{category1}</Tag>}
              {category2 && <Tag color="#87d068">{category2}</Tag>}
              {category3 && <Tag color="#108ee9">{category3}</Tag>}
            </div>

            <div>
              <SettingOutlined />
            </div>
          </StyledTitle>
        }
        bordered={false}
        cover={
          <>
            <div style={{ paddingLeft: "30px", paddingTop: "10px" }}>
              {[...new Array(Number(star))].fill("").map((_, idx) => (
                <StarTwoTone key={idx} style={{ marginRight: "5px" }} />
              ))}
              <br />
              {question_text}
            </div>

            {question_url ? (
              <ImageWrapper>
                <ImageInnerWrapper>
                  <Image
                    src={question_url}
                    alt="brain-card"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </ImageInnerWrapper>
              </ImageWrapper>
            ) : null}
          </>
        }
        actions={[
          <QuestionCircleFilled
            key="close"
            onClick={onClickNeuronIncorrect(data)}
            style={{ color: isOpen ? "green" : "" }}
          />,
          <StarFilled key="star" onClick={onClickNeuronCorrect(data)} />,
        ]}
      ></Card>
      {isOpen && (
        <>
          <NeuronAnswerCard text={answer1_text} url={answer1_url} />
          <NeuronAnswerCard text={answer2_text} url={answer2_url} />
          <NeuronAnswerCard text={answer3_text} url={answer3_url} />
        </>
      )}
      <br />
      <br />
    </Wrapper>
  );
};

export default NeuronCard;

const Wrapper = styled.div`
  width: 600px;

  @media (max-width: ${SCREENS.lg}) {
    width: 450px;
  }

  @media (max-width: ${SCREENS.md}) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding: 15px;
  height: 100%;
`;

const ImageInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #898884;
  border-radius: 15px;
  height: 450px;
  width: 100%;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    margin-left: 5px;
    margin-right: 0;
  }
`;
