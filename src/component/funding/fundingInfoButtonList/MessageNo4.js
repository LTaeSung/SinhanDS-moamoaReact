import BootPath from "./../../../BootPath";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MessageNo4 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //post 전송할 데이터 필드. giveup 필드값을 바꾸기 위해 펀딩의 no와 현재 로그인한 member_no를 담음
    fundingNo: obj.fundingNo,
    memberNo: obj.fundingMemberNo,
  });
  const voteSuccess = async () => {
    try {
      const response = await axios.post(
        bootpath + "/fund/voteSuccess",
        formData
      );

      if (response.data.result === "vote_success") {
        alert("성공에 투표 완료. 다른 분들의 투표를 기다려주세요");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else if (response.data.result === "vote_success_end") {
        alert("성공에 투표완료. 정산받아주세요.");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else {
        alert("투표 안됨");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  const voteFail = async () => {
    try {
      const response = await axios.post(bootpath + "/fund/voteFail", formData);

      if (response.data.result === "vote_fail") {
        alert("실패에 투표 완료. 다른 분들의 투표를 기다려주세요");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else if (response.data.result === "vote_fail_end") {
        alert("실패에 투표완료. 정산받아주세요.");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else {
        alert("투표 안됨");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  return (
    <>
      <Link id="state_btn_left" onClick={voteSuccess}>
        성공
      </Link>
      <Link id="state_btn_right" onClick={voteFail}>
        실패
      </Link>
    </>
  );
};

export default MessageNo4;
