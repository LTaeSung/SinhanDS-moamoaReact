import MemberHeader from "./MemberHeader";
import React, { useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import RegistedImagePath from "../../registedImagePath";
import CommonImagePath from "../../commonImagePath";
function Signup() {
  const { bootpath } = useContext(BootPath);
  const { commonImagePath } = useContext(CommonImagePath);
  const NAVER_CLIENT_ID = "CdK5qEW_eg3VAa_uRt9l"; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = "http://localhost:3000/login/beforeSignup"; // Callback URL
  const STATE = "false";
  const [isChecked, setIsChecked] = useState(false);

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  const NaverLogin = () => {
    if (isChecked) {
      // 체크박스가 체크됐을 때
      window.location.href = NAVER_AUTH_URL;
    } else {
      // 체크박스가 체크되지 않았을 때
      alert("개인정보 제공에 동의하셔야 회원가입이 가능합니다.");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원가입</h3>
          <button onClick={NaverLogin}>
            <div>
              {/* <img src={commonImagePath + "naver.png"} width="100" /> */}
              가입하기
            </div>
          </button>
          <br />
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            회원가입에 필요한 개인정보 제공에 동의하십니까?
          </label>
        </div>
      </div>
    </>
  );
}

export default Signup;
