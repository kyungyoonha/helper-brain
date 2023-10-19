import { Alert } from "antd";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface Props {
  text: string;
  url: string;
}

const NeuronAnswerCard = ({ text, url }: Props) => {
  return (
    <AnswerWrapper>
      {text && (
        <Alert
          showIcon
          message={
            <>
              {text}
              {url && (
                <ImageWrapper>
                  <ImageInnerWrapper>
                    <Image
                      src={url}
                      alt="answer-card"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </ImageInnerWrapper>
                </ImageWrapper>
              )}
            </>
          }
          type="success"
        />
      )}
    </AnswerWrapper>
  );
};

export default NeuronAnswerCard;

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
  height: 230px;
  width: 100%;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const AnswerWrapper = styled.div`
  & > div {
    margin-top: 20px;
  }
`;
