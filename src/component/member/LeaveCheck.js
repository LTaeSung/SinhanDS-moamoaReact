import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "../../BootPath";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LeaveCheck.css";

function LeaveCheck() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const member_no = sessionStorage.getItem("no") || "";

  const [formData, setFormData] = useState({
    //전송할 데이터, 여기에서는 선택한 no만 전송해서 삭제요청
    no: 0,
    memberno: member_no,
  });

  const goLeave = async () => {
    const response = await axios.post(`${bootpath}/member/leave`, formData);

    if (response.data.result === "leave_fail") {
      alert("진행 중인 챌린지가 없어야 탈퇴가 가능합니다.");
      navigate("/funding/member/join");
    }

    if (response.data.result === "leave_finish") {
      alert("회원탈퇴가 완료되었습니다.");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("no");
      sessionStorage.removeItem("name");
      navigate("/");
    }

    if (response.data.result === "exist_point") {
      alert("인출할 포인트가 남아있습니다.");
      navigate("/point/minus");
    }
  };

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
          <div className="real_leave"> 정말로 탈퇴하시겠습니까? </div>
          <br />
          <Link className="leave_btn" onClick={goLeave}>
            탈퇴
          </Link>
          <Link className="leave_btn_black" onClick={goBack}>
            아니오
          </Link>
        </div>
      </div>
    </>
  );
}

export default LeaveCheck;
