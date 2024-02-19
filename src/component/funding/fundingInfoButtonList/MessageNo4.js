import BootPath from "./../../../BootPath";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

const MessageNo4 = ({ obj }) => {
  console.log(obj);
  const { bootpath } = useContext(BootPath);
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

      console.log("서버 응답:" + response.data.result);
      console.log(response.data);
      if (response.data.result === "vote_success") {
        console.log("성공에 투표 완료" + response.data.giveUp);
      } else if (response.data.result === "vote_success_end") {
        alert("내가 마지막으로 투표해서 정산 상태로 변함");
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

      console.log("서버 응답:" + response.data.result);
      console.log(response.data);
      if (response.data.result === "vote_fail") {
        console.log("실패에 투표 완료" + response.data.giveUp);
      } else if (response.data.result === "vote_fail_end") {
        alert("내가 마지막으로 투표해서 정산 상태로 변함");
      } else {
        alert("투표 안됨");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  return (
    <>
      <Link className="btn" onClick={voteSuccess}>
        성공
      </Link>
      <Link className="btn" onClick={voteFail}>
        실패
      </Link>
    </>
  );
};

export default MessageNo4;
