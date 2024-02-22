import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import RegistedImagePath from "../../registedImagePath";
import FundingMember from "./FundingMember";
import FundingComment from "./FundingComment";
import FundingInfoButton from "./FundingInfoButton";
import "./fundinginfo.css";
function FundingInfo() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({});
  const [state, setState] = useState({});
  const { registedImagePath } = useContext(RegistedImagePath);
  const [showComment, setShowComment] = useState(false);

  let no = params.get("no");

  const member_no = sessionStorage.getItem("no") || "";

  const getInfo = () => {
    axios.get(`${bootPath.bootpath}/fund/info?no=${no}`).then((res) => {
      setData(res.data.fundEntity);
    });
  };

  const getMessageState = () => {
    axios
      .get(
        `${bootPath.bootpath}/funding/member/info?no=${no}&member_no=${member_no}`
      )
      .then((res) => {
        setState(res.data.myFundInfo);
      });
  };
  useEffect(() => {
    getInfo();
    getMessageState();
  }, []);

  useEffect(() => {
    console.log("상태3");
    console.log(state);
  }, [state]);
  console.log(data);
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩 상세내역</h3>
          <div className="infolist">
            <img src={registedImagePath + data.photo} width="100" />
            <p id="fundinginfo_title"> {data.title}</p>
            <br></br>
            <div id="fundinginfo_collectedpoint">
              <div className="listline" id="fundimg_title_tag">
                모인 금액:{" "}
              </div>{" "}
              <div className="listline" id="collectedpoint">
                {data.collectedpoint}
              </div>{" "}
              <div className="listline" id="funding_title_tag_back">
                원
              </div>
            </div>
            <div id="fundinginfo_">주최자: {data.startmembername}</div>
            <p id="fundinginfo_">현재 참여자: {data.candidate} 명</p>

            <div id="fundinginfo_monthlypaymentdate">
              <p className="listline">매달결제일:</p>{" "}
              <p className="listline" id="red">
                {data.monthlypaymentdate}
              </p>{" "}
              <p className="listline">일</p>
            </div>
            <div id="fundinginfo_monthlypaymentamount">
              <p className="listline">매달 결제 금액:</p>{" "}
              <p className="listline" id="red">
                {data.monthlypaymentamount}
              </p>{" "}
              <p className="listline">원</p>
            </div>
            <p id="fundinginfo_completeinterest"></p>
            <p id="fundinginfo_">
              기간: {data.startdate} ~{data.fundingduedate}
            </p>
            <br></br>
            <p id="fundinginfo_description">챌린지 소개:</p>
            <p id="fundinginfo_"> {data.description}</p>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <FundingInfoButton obj={{ ...state, ...data }} />
            </div>
            <br></br>
            <p id="fundinginfo_description">참여자 목록 </p>
            <FundingMember />
            <br></br>
            <hr id="hr"></hr>

            <button
              className="comment"
              onClick={() => setShowComment((prev) => !prev)}
            >
              댓글 보기
            </button>
            {showComment && (
              <div>
                <FundingComment totalElement={data.totalElement} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FundingInfo;
