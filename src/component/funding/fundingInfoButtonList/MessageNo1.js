import React, { useEffect, useState } from "react";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MessageNo1 = ({ obj }) => {
  console.log("obj: ");
  console.log(obj);
  const { bootpath } = useContext(BootPath);
  const [formData, setFormData] = useState({
    //post 전송할 데이터 필드. giveup 필드값을 바꾸기 위해 펀딩의 no와 현재 로그인한 member_no를 담음
    fundingNo: obj.fundNo,
  });
  const GiveUp = async () => {
    try {
      const response = await axios.post(bootpath + "/fund/giveup", formData);

      console.log("서버 응답:" + response.data.result);
      console.log(response.data);
      if (response.data.result === "giveup_success") {
        // giveup_success인 경우, 중도포기 완료된 것임. DB체크해보기
        console.log("중도포기됐음");
        console.log("중도포기상태머임" + response.data.giveUp);
        // sessionStorage.setItem("checkgiveup", response.data.giveUp);
      } else if (response.data.result === "fail") {
        alert("중도포기 실패");
        // setResponse(4);
      } else if (response.data.result === "one_person_fund_finished") {
        alert("나 혼자인데 중도포기 눌러서 이 펀딩은 정산상태로 바뀌었다.");
        // setResponse(3);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      {" "}
      <Link className="btn" to={"/funding/modifycard?no=" + obj.fundingNo}>
        결제정보 수정
      </Link>
      <Link className="btn" onClick={GiveUp}>
        중도포기
      </Link>
    </>
  );
};

export default MessageNo1;
