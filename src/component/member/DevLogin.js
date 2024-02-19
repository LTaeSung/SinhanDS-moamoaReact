import React, { useState, useEffect } from "react";
import MemberHeader from "./MemberHeader";
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
          </form>
          <br />
          <Link className="login_btn" to={`/login`}>
            N 네이버로 로그인하기
          </Link>
          <br />
          <Link
            className="login_btn"
            style={{ backgroundColor: "#FEE500", border: "2px solid #FEE500" }}
            to={`/login`}
          >
            K 카카오로 로그인하기
          </Link>
          <br />
          <Link
            className="login_btn"
            to={`/login`}
            style={{ backgroundColor: "#1877F2", border: "2px solid #1877F2" }}
          >
            f 페이스북으로 로그인하기
          </Link>
          <br />
          <Link
            className="login_btn"
            to={`/login`}
            style={{ backgroundColor: "#EB4335", border: "2px solid #EB4335" }}
          >
            G 구글로 로그인하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyLogin;
