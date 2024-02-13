import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import RegistedImagePath from "../../registedImagePath";
import CommonImagePath from "../../commonImagePath";
function Signup() {
  const { bootpath } = useContext(BootPath);
  const { commonImagePath } = useContext(CommonImagePath);
  const NAVER_CLIENT_ID = "CdK5qEW_eg3VAa_uRt9l"; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = "http://localhost:3000/login/after"; // Callback URL
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">로그인</h3>
          <button onClick={NaverLogin}>
            <div>
              <img src={commonImagePath + "naver.png"} width="100" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
