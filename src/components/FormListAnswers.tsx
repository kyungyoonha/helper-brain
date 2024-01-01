import React from "react";
import {
  Control,
  UseFormRegister,
  useFieldArray,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { NeuronForm } from "./FloatButtonForm";
import { Button } from "antd";
import FormItemInput from "./FormItemInput";
import styled from "styled-components";
import FormItemImage from "./FormItemImage";
import { DeleteFilled } from "@ant-design/icons";

type Prop = {
  register: UseFormRegister<NeuronForm>;
  control: Control<NeuronForm, any>;
  errors: FieldErrors<NeuronForm>;
  setValue: UseFormSetValue<NeuronForm>;
};

const FormListAnswers = ({ control, register, errors, setValue }: Prop) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const onChange = (key: any) => (value: any) => {
    setValue(key, value);
  };

  return (
    <>
      <label>대답</label>
      {fields.map((item, index) => {
        // console.log(item);
        return (
          <Wrapper key={item.id}>
            <FormItemInput
              label="답변"
              errorMessage={
                errors?.answers && errors.answers[index]?.answer?.message
              }
              placeholder="답변을 입력해주세요."
              register={register(`answers.${index}.answer`, {
                required: "값을 입력해주세요",
              })}
            />

            <FormItemImage
              label="질문 이미지"
              value={item.imageUrl}
              onChange={onChange(`answers.${index}.imageUrl`)}
            />

            <div className="button-delete" onClick={() => remove(index)}>
              <DeleteFilled />
            </div>
          </Wrapper>
        );
      })}
      <div>
        <Button
          color="black"
          onClick={() => append({ answer: "", imageUrl: "" })}
          style={{ width: "150px" }}
        >
          ➕ 대답 추가
        </Button>
      </div>
    </>
  );
};

export default FormListAnswers;

const Wrapper = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: relative;

  & > .button-delete {
    position: absolute;
    top: 5px;
    right: 10px;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
