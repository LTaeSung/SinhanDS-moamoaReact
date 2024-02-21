import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "../../BootPath";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

    console.log("서버 응답:", response.data.result);
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
