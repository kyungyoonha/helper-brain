"use client";
import React from "react";
import { useUIContext } from "@/contexts";
import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const Header = () => {
  const { data: session } = useSession();
  const { dashboard, neuronList } = useUIContext();

  return (
    <Wrapper>
      <div>HELPER BRAIN</div>
      <div>{`${dashboard.totalCorrectCount}/${dashboard.total}`}</div>
      <ButtonWrapper>
        {session ? (
          <>
            {session.user?.name && (
              <p style={{ marginRight: "10px" }}>{session.user.name}</p>
            )}
            <Button onClick={() => signOut()}>로그아웃</Button>
            {session.user?.image && (
              <Image
                width="50"
                height="50"
                src={session.user.image}
                alt="Profile Image"
                style={{ borderRadius: "100px" }}
              />
            )}
          </>
        ) : (
          <Button onClick={() => signIn()}>로그인</Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 65px;
  width: 100%;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 2px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    margin-left: 10px;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  background: white;
`;
