"use client";
import { Button } from "antd";
import { ClientSafeProvider, signIn, useSession } from "next-auth/react";
import styled from "styled-components";

type Props = {
  providers:
    | { [s: string]: ClientSafeProvider }
    | ArrayLike<ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <StyledSection>
      {Object.values(providers).map(({ name, id }) => (
        <ButtonWrapper key={name}>
          <Button onClick={() => signIn(id, { callbackUrl })}>
            Sign in with {name}
          </Button>
        </ButtonWrapper>
      ))}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 15px;
  width: 100%;

  button {
    width: 100%;
    height: 50px;
  }
`;
