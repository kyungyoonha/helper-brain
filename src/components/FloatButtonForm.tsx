"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, Modal, Button } from "antd";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import FormItemInput from "./FormItemInput";
import FormItemImage from "./FormItemImage";
import FormListAnswers from "./FormListAnswers";

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
    control,
    formState: { errors },
    watch,
  } = useForm<NeuronForm>();

  const [isOpenModal, setIsModalOpen] = useState(false);
  const imageUrl = watch("imageUrl");
  const answers = watch("answers");

  const onClickButton = () => {
    setIsModalOpen(true);
  };

  const onSubmit: SubmitHandler<NeuronForm> = (data) =>
    console.log("submit", data);

  const onChange = (key: any) => (value: any) => {
    setValue(key, value);
  };

  // console.log(errors);

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

          <FormItemImage
            label="질문 이미지"
            value={imageUrl}
            onChange={onChange("imageUrl")}
          />

          <FormListAnswers
            errors={errors}
            register={register}
            control={control}
            setValue={setValue}
          />
          <br />

          <Button type="primary" htmlType="submit" color="black" block>
            제출하기
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default FloatButtonForm;
