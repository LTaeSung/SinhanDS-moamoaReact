import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BootPath from "./../../BootPath";
import { useContext } from "react";

//네이버 api 사용 로그인
const NaverAfter = () => {
  const { bootpath } = useContext(BootPath);
  const params = useLocation();
  console.log(params);
  const callbackUrl = bootpath + "/member/login" + params.search;

  getApi(params, callbackUrl);

  return <></>;
};

const getApi = (params, callbackUrl) => {
  console.log(callbackUrl);
  axios.get(callbackUrl).then((res) => {
    console.log(res);
    if (res.data.result === "success") {
      console.log(res.data.no);
      console.log(res.data.email);
      sessionStorage.setItem("no", res.data.no);
      sessionStorage.setItem("email", res.data.email);
      window.location.href = "/member/info";
    } else {
      window.location.href = "/";
    }
  });
};
export default NaverAfter;
