import { request } from "@/apis/axios";
import { useMutation } from "@tanstack/react-query";
import { UserAdditionalInfo, birthdateValType } from "@/types/client.types";
import { SignupContentProps } from "@/pages/signup/components/TermsAgreements";
import { useRouter } from "next/router";

function useSubmitAdditionalInfo({ progressStatus }: SignupContentProps) {
  const router = useRouter();
  const onSubmit = (data: {
    nickName: string;
    gender: string;
    birthdate: birthdateValType | null;
    birthyear: birthdateValType | null;
    birthmonth: birthdateValType | null;
  }) => {
    const userBirthdate = formatDateToStr(data.birthyear?.value!, data.birthmonth?.value!, data.birthdate?.value!);
    const userSignUpData = {
      birthDate: userBirthdate,
      gender: data.gender,
      nickName: data.nickName,
    };
    signUp(userSignUpData);
  };

  const formatDateToStr = (year: number, month: number, date: number) => {
    const formateDate = String(year) + "-" + String(month).padStart(2, "0") + "-" + String(date).padStart(2, "0");
    return formateDate;
  };

  const handleSignUp = async (userSignUpData: UserAdditionalInfo) => {
    const signup = await request<any>({
      url: `http://ec2-13-124-115-4.ap-northeast-2.compute.amazonaws.com:8080/api/guest/update`,
      method: "post",
      data: userSignUpData,
    });

    return signup.data;
  };

  const { mutate: signUp, error } = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (data: { data: boolean; status: number }) => {
      console.log(); //jwt토큰으로 저장
      progressStatus();
    },
    onError: (error) => {
      alert(error);
      router.push("/login");
    },
  });

  return {
    onSubmit,
  };
}

export default useSubmitAdditionalInfo;

// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxeEhOMnBvV2VhQ1RNOWczbmJNM0RkVXJZYjRldHR0Z0hUeTI1cGdkZURFIiwiaWF0IjoxNzA4MTA4NTcwLCJleHAiOjE3MDgxMTIxNzB9.yYOlvNbmNkCGjt3wbiVF0jWb7okGGttXYh0BRSHgf9k

// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxeEhOMnBvV2VhQ1RNOWczbmJNM0RkVXJZYjRldHR0Z0hUeTI1cGdkZURFIiwiaWF0IjoxNzA4MTA4NjIzLCJleHAiOjE3MDgxMTIyMjN9.HmGWTqaTjra2i2iuFvlLfBuz_sDvHsT2eMOXhNo1f4g
