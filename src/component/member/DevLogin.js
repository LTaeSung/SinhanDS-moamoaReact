import React, { useState, useEffect } from "react";
import MemberHeader from "./MemberHeader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BootPath from "./../../BootPath";
import "./Login.css";

import { useContext } from "react";
import Login from "./Login";
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
    if (document.querySelector("input").value === "") {
      alert("이메일을 입력해 주세요");
    }

    getApi();
  };
  const getApi = () => {
    console.log(param);
    axios.post(bootpath + "/member/devlogin", param).then((res) => {
      console.log(res);
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("name", res.data.name);
        window.location.href = "/member/info";
      }
    });
  };
  return (
    <>
      <div className="sub">
        <div className="size">
          <form method="post" action="" style={{ textAlign: "center" }}>
            <input type="text" name="email" onChange={handleChange} />
            <Link className="btn" onClick={save}>
              로그인
            </Link>
            <hr className="line"></hr>
          </form>
          <br />
          <Login />
        </div>
      </div>
    </>
  );
};

export default MyLogin;
