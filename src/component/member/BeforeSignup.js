import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BootPath from "../../BootPath";
import { useContext } from "react";

//네이버 api 사용 로그인
const Beforesignup = () => {
  const { bootpath } = useContext(BootPath);
  const params = useLocation();
  console.log("패럼?" + params.search);
  //params.search에 스프링부트로 보내줄 code가 들어있음
  //이거 내일15일에 member/signup 컨트롤러에 만들어서 처리할거
  const callbackUrl = bootpath + "/member/login" + params.search;

  getApi(params, callbackUrl);

  return <></>;
};

const getApi = (params, callbackUrl) => {
  console.log("콜백주소" + callbackUrl);
  //스프링부트의 /member/signup에 code 파라미터를 담아서 get 요청? -> 회원가입, 즉 추가가 됐으면 success가져오면 되고, 추가가 안되면 fail을 받아오면 될것
  axios.get(callbackUrl).then((res) => {
    console.log(res);
    if (res.data.result === "success") {
      // 회원가입 성공 알림
      sessionStorage.setItem("no", res.data.no);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("name", res.data.name);
      window.location.href = "/member/info";
    } else {
      // 회원가입 실패
      alert("회원정보가 존재하지않아 회원가입 페이지로 이동합니다.");
      window.location.href = "/member/signup";
    }
  });
};
export default Beforesignup;
