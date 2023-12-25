"use client";
import React, { useState, useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, InputRef } from "antd";
import Image from "next/image";

const InputImage = () => {
  const inputRef = useRef<InputRef>(null);

  const [imageUrl, setImageUrl] = useState<any>(null);
  let reader = new FileReader();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    e.preventDefault();

    const files = e.target.files;

    if (files && files.length) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if (reader.result) setImageUrl(reader.result);
      };
    }
  };

  const onClickButton = () => {
    inputRef?.current?.input?.click();
  };

  return (
    <>
      <Input
        type="file"
        accept="image/*"
        onChange={onChange}
        hidden
        ref={inputRef}
        style={{ display: "none" }}
      />

      <Button icon={<UploadOutlined />} onClick={onClickButton}>
        이미지 업로드
      </Button>
      <div
        style={{
          width: "250px",
          height: "250px",
          position: "relative",
          marginTop: "10px",
        }}
      >
        <Image
          src={imageUrl ? imageUrl : `/images/no-image.png`}
          fill
          style={{ objectFit: "cover" }}
          alt="프로필 이미지"
        />
      </div>
    </>
  );
};

export default InputImage;
