import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BootPath from "./../../BootPath";
import { useContext } from "react";
const MyLogin = () => {
  const { bootpath } = useContext(BootPath);
  const [param, setParam] = useState({});
  console.log(sessionStorage.getItem("email"));
  const handleChange = (e) => {
    setParam({
      ...param,
      [e.target.name]: e.target.value,
    });
  };
  const save = () => {
    getApi();
  };
  const getApi = () => {
    console.log(param);
    axios.post(bootpath + "/member/devlogin", param).then((res) => {
      console.log(res);
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("email", res.data.email);
        window.location.href = "/member/info";
      }
    });
  };
  return (
    <>
      <form method="post" action="">
        <input type="text" name="email" onChange={handleChange} />
        <Link className="btn" onClick={save}>
          로그인
        </Link>
      </form>
    </>
  );
};

export default MyLogin;
