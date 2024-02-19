import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import CommonImagePath from "../../commonImagePath";
import FundingMember from "./FundingMember";
import FundingComment from "./FundingComment";
import FundingInfoButton from "./FundingInfoButton";
function FundingInfo() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({});
  const [state, setState] = useState({});
  const { commonImagePath } = useContext(CommonImagePath);
  let no = params.get("no");

  const member_no = sessionStorage.getItem("no") || "";

  const getInfo = () => {
    axios.get(`${bootPath.bootpath}/fund/info?no=${no}`).then((res) => {
      setData(res.data.fundEntity);
    });
  };

  const getMessageState = () => {
    console.log("실행은되나");
    axios
      .get(
        `${bootPath.bootpath}/funding/member/info?no=${no}&member_no=${member_no}`
      )
      .then((res) => {
        setState(res.data.myFundInfo);
      });
    console.log("실행은되나2");
  };
  useEffect(() => {
    getInfo();
    getMessageState();
  }, []);

  useEffect(() => {
    console.log("상태3");
    console.log(state);
  }, [state]);
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
              <FundingInfoButton obj={{ ...state }} />
            </div>
            <p>참여자 목록</p>
            <FundingMember />
            <div>목록</div>
            <p>펀딩 타입: {data.fundingtype}</p>
            <p>댓글</p>
            <FundingComment />
          </div>
        </div>
      </div>
    </>
  );
}

export default FundingInfo;
