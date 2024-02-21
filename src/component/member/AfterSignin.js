import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BootPath from "./../../BootPath";
import { useContext } from "react";

//네이버 api 사용 로그인
const NaverAfter = () => {
  const { bootpath } = useContext(BootPath);
  const params = useLocation();
  console.log("패럼?" + params.search);
  //params.search에 스프링부트로 보내줄 code가 들어있음
  const callbackUrl = bootpath + "/member/login" + params.search;

  getApi(params, callbackUrl);

  return <></>;
};

const getApi = (params, callbackUrl) => {
  console.log("콜백주소" + callbackUrl);
  //스프링부트의 /member/login에 code 파라미터를 담아서 get 요청
  axios.get(callbackUrl).then((res) => {
    console.log(res);
    if (res.data.result === "success") {
      sessionStorage.setItem("no", res.data.no);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("name", res.data.name);
      window.location.href = "/member/info";
    } else {
      window.location.href = "/login/signup";
    }
  });
};
export default NaverAfter;
