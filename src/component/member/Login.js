import React from "react";
import ReactPath from "../../ReactPath";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  const { reactpath } = useContext(ReactPath);
  const NAVER_CLIENT_ID = "CdK5qEW_eg3VAa_uRt9l"; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = reactpath + "/login/after"; // Callback URL
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="login_title">로그인</h3>
          <hr className="line"></hr>
          <div className="naver_button_container">
            <div onClick={NaverLogin} className="login_btn">
              N 네이버로 로그인하기
            </div>
          </div>
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
}

export default Login;
