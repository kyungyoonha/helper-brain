"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, Modal, Button } from "antd";
import InputImage from "./InputImage";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import FormItemInput from "./FormItemInput";

export interface NeuronForm {
  id?: string;
  description: string;
  imageUrl: string;
  answers: AnswerForm[];
}

interface AnswerForm {
  id?: string;
  answer: string;
  imageUrl: string;
}

const FloatButtonForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<NeuronForm>();

  const [isOpenModal, setIsModalOpen] = useState(false);
  const imageUrl = watch("imageUrl");

  const onClickButton = () => {
    setIsModalOpen(true);
  };

  const onSubmit: SubmitHandler<NeuronForm> = (data) =>
    console.log("submit", data);

  const onChange = (key: any) => (value: any) => {
    setValue(key, value);
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={onClickButton}
      />

      <Modal
        open={isOpenModal}
        title={"뉴런 추가"}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItemInput
            label="질문"
            errorMessage={errors?.description?.message}
            placeholder="값을 입력해주세요."
            register={register("description", {
              required: "값을 입력해주세요",
            })}
          />

          <InputImage value={imageUrl} onChange={onChange("imageUrl")} />

          <Button size="small" color="black" onClick={() => {}} block>
            할인 추가하기
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default FloatButtonForm;
