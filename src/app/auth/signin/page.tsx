import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "@/components/Layout";
import SectionSignin from "@/components/SectionSignin";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

// 커스텀 로그인 페이지
export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <Layout>
      <SectionSignin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </Layout>
  );
}
