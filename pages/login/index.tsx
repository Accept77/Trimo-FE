import Clickable from "@/components/atoms/Clickable";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/molecules/NavigationBar";
import LogoGroup from "@/public/logos/logoGroup.png";
import kakao from "@/public/images/icons/kakao.png";
import google from "@/public/images/icons/google.png";
import naver from "@/public/images/icons/naver.png";
import ShadowBox from "@/components/atoms/ShadowBox";
import { GetServerSidePropsContext } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessTokenFormCookie";
import { validateRedirectionByLoginStatus } from "@/utils/validateByLoginStatus";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const accessToken = await getAccessTokenFromCookie(context);

    const isRedirectNeeded = validateRedirectionByLoginStatus({
      statusToBlock: "Login",
      accessToken,
    });

    if (isRedirectNeeded) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch {
    return { notFound: true };
  }
};
function Login() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Nav className="-mb-10" isOnlyLogo />
      <ShadowBox className="maxTablet:w-5/6 maxTablet:px-25 maxTablet:pb-35">
        <Image src={LogoGroup} width={550} height={165} alt="logo"></Image>
        <span className="mb-37 maxTablet:text-14 tablet:text-18">트리모에 오신 것을 환영합니다! 🤗</span>
        <div className="flex w-437 flex-col gap-10 maxTablet:w-full">
          <Link
            href={
              "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=zPNfUhg8Ln9dvOUlf7ae&redirect_uri=https://www.trimo.kr/signup/naver"
            }
          >
            <Clickable
              color="naver"
              size="large"
              className="flex w-550 items-center gap-12 whitespace-nowrap px-28 font-medium maxTablet:w-full"
            >
              <Image src={naver} alt="example" width={36} height={36}></Image>
              네이버 로그인
            </Clickable>
          </Link>
          <Link
            href={
              "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=ee78bfa008b563c542aacf362daf4c5a&redirect_uri=https://www.trimo.kr/signup/kakao"
            }
          >
            <Clickable
              color="kakao"
              size="large"
              className="flex w-550 items-center gap-12 px-28 font-medium maxTablet:w-full "
            >
              <Image src={kakao} alt="example" width={36} height={36}></Image>
              카카오 로그인
            </Clickable>
          </Link>
          <Link
            href={
              "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=730856835844-o09fr02aksdpk7givfn8hkrgpe21jej8.apps.googleusercontent.com&response_type=code&redirect_uri=https%3A%2F%2Fwww.trimo.kr%2Fsignup%2Fgoogle"
            }
          >
            <Clickable
              color="white"
              size="large"
              className="flex w-550 items-center gap-12 px-28 font-medium maxTablet:w-full"
            >
              <Image src={google} alt="example" width={36} height={36}></Image>
              구글 로그인
            </Clickable>
          </Link>
        </div>
      </ShadowBox>
    </div>
  );
}

export default Login;
