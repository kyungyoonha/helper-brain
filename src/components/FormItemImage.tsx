"use client";
import React, { useRef } from "react";
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Input, InputRef } from "antd";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  label: string;
  value: string;
  onChange: (value: any) => void;
};

const FormItemImage = ({ label, value, onChange }: Props) => {
  const inputRef = useRef<InputRef>(null);

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length) {
      const { uploadURL } = await fetch("/api/get-cloudflare").then((r) =>
        r.json()
      );
      const form = new FormData();
      form.append("file", files[0]);

      const { result } = await fetch(uploadURL, {
        method: "POST",
        body: form,
      }).then((r) => r.json());

      // TODO: imageUrl -> imageKey로 변경
      const url = URL.createObjectURL(files[0]);
      onChange(url);
    }
  };

  const onClickButton = () => {
    inputRef?.current?.input?.click();
  };

  const onClickDelete = () => {
    onChange(null);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <Input
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        hidden
        ref={inputRef}
        style={{ display: "none" }}
      />

      <Button icon={<UploadOutlined />} onClick={onClickButton}>
        {value ? "재 업로드" : "이미지 업로드"}
      </Button>
      {value && (
        <ImageWrapper>
          <Image
            src={value ? value : `/images/no-image.png`}
            fill
            style={{ objectFit: "cover" }}
            alt="프로필 이미지"
          />
          <div className="deleteButton" onClick={onClickDelete}>
            <DeleteFilled />
          </div>
        </ImageWrapper>
      )}
    </Wrapper>
  );
};

export default FormItemImage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & > button {
    width: 150px;
  }
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  margin-top: 10px;
  margin-bottom: 20px;

  .deleteButton {
    position: absolute;
    top: 0;
    right: -25px;
    padding: 1px 3px;
    z-index: 10;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
