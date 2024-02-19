import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function LeaveCheck() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const member_no = sessionStorage.get("no");

  const goLeave = () => {};

  const goBack = () => {
    //탈퇴하기 체크에서 취소누르면 이전 페이지로 이동
    navigate(-1);
  };

  return (
    <>
      <MemberHeader />

      <div className="sub">
        <div className="size">
          <br />
          <div> 정말로 탈퇴하시겠습니까? </div>
          <br />
          <Link className="btn" onClick={goLeave}>
            탈퇴
          </Link>
          <Link className="btn" onClick={goBack}>
            아니오
          </Link>
        </div>
      </div>
    </>
  );
}

export default LeaveCheck;
