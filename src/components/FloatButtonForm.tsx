"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, Modal, Form, Input, Button } from "antd";

const FloatButtonForm = () => {
  const [form] = Form.useForm();

  const [isOpenModal, setIsModalOpen] = useState(false);

  const onClickButton = () => {
    setIsModalOpen(true);
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
        <Form form={form} layout="vertical">
          <Form.Item
            label="질문"
            name={"description"}
            rules={[{ required: true, message: "질문을 입력해주세요." }]}
          >
            <Input autoComplete="off" placeholder="질문을 입력해주세요." />
          </Form.Item>
          <Form.List name={"answers"}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <Form.Item
                    required={false}
                    key={field.key}
                    style={{ marginBottom: "5px" }}
                  >
                    <Input
                      placeholder="할인 정보를 입력해주세요."
                      allowClear
                      style={{ width: "calc(100% - 80px)" }}
                    />
                  </Form.Item>
                ))}
                {!!fields.length && <br />}
                <Button size="small" color="black" onClick={() => add()} block>
                  할인 추가하기
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default FloatButtonForm;
