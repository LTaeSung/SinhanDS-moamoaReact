import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import CommonImagePath from "../../commonImagePath";
import FundingMember from "./FundingMember";

function FundingInfo() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({});
  const { commonImagePath } = useContext(CommonImagePath);
  let no = params.get("no");
  // const [response, setResponse] = useState(1);

  const member_no = sessionStorage.getItem("no") || "";
  const [formData, setFormData] = useState({
    //post 전송할 데이터 필드. giveup 필드값을 바꾸기 위해 펀딩의 no와 현재 로그인한 member_no를 담음
    fundingno: no,
    memberno: member_no,
  });

  const GiveUp = async () => {
    try {
      const response = await axios.post(
        `${bootPath.bootpath}/fund/giveup`,
        formData
      );

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

  const getInfo = () => {
    axios.get(`${bootPath.bootpath}/fund/host/${no}`).then((res) => {
      setData(res.data);
      console.log(res);
    });
  };

  // 혹시 모르니까 지우지 말기
  // const checkGiveup = async () => {
  //   const checkResponse = await axios.post(
  //     `${bootPath.bootpath}/fund/checkgiveup`,
  //     formData
  //   );
  //   console.log("받아온 기브업" + checkResponse.data.checkgiveup);
  //   sessionStorage.setItem("checkgiveup", checkResponse.data.checkgiveup);
  // };

  useEffect(() => {
    // checkGiveup();
    getInfo();
  }, []);

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩 상세내역</h3>
          <div>
            사진:
            <img src={`${commonImagePath}${data.photo}`} width="100" />
            <p>제목: {data.title}</p>
            <p>목표 금액: {data.goalamount} 원</p>
            <p>모인 금액: {data.collectedpoint} 원</p>
            <p>주최자: {data.startmembername}</p>
            <p>현재 참여자: {data.candidate} 명</p>
            <p>매달결제일: {data.monthlypaymentdate} 일</p>
            <p>매달 결제 금액: {data.monthlypaymentamount} 원</p>
            <p>성공 여부: {data.completeinterest}</p>
            <p>시작일: {data.startdate}</p>
            <p>마감일: {data.fundingduedate}</p>
            <p>챌린지 소개:</p>
            <p> {data.description}</p>
            <div style={{ textAlign: "center" }}>
              <Link className="btn" to="/funding/make">
                결제정보 수정
              </Link>
              <Link className="btn" onClick={GiveUp}>
                중도포기
              </Link>
            </div>
            <p>참여자 목록</p>
            <FundingMember />
            <div>목록</div>
            <p>펀딩 타입: {data.fundingtype}</p>
            <p>댓글: {data.comment}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FundingInfo;
