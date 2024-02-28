import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import Formatter_notime from "./../../Formatter_notime";
import RegistedImagePath from "../../registedImagePath";
import FundingMember from "./FundingMember";
import FundingComment from "./FundingComment";
import FundingInfoButton from "./FundingInfoButton";
import CommonImagePath from "../../commonImagePath";
import "./fundinginfo.css";
function FundingInfo() {
  const bootPath = useContext(BootPathContext);
  const { commonImagePath } = useContext(CommonImagePath);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({});
  const [state, setState] = useState({});
  const { registedImagePath } = useContext(RegistedImagePath);
  const [showComment, setShowComment] = useState(false);
  const formatter = Formatter_notime;

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

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title_join_funding">챌린지 상세내역</h3>
          <div className="infolist">
            <img
              src={
                data.photo
                  ? registedImagePath + data.photo
                  : commonImagePath + "challenge.jpg"
              }
              width="360"
              alt=""
            />
            <h4 className="fundingTitle"> {data.title}</h4>
            <div id="fundinginfo_collectedpoint_des">모인 금액</div>
            <div id="fundinginfo_collectedpoint">{data.collectedpoint}원</div>

            <p id="fundinginfo_">주최자: {data.startmembername}</p>
            <p id="fundinginfo_">현재 참여자: {data.candidate}명</p>
            <div id="fundinginfo_monthlypaymentdate">
              <p className="listline">매달결제일:</p>{" "}
              <p className="listline" id="red">
                {data.monthlypaymentdate}일
              </p>{" "}
            </div>
            <div id="fundinginfo_monthlypaymentamount">
              <p className="listline">매달 결제 금액:</p>{" "}
              <p className="listline" id="red">
                {data.monthlypaymentamount}원
              </p>
            </div>
            <p id="fundinginfo_completeinterest"></p>
            <p id="fundinginfo_">
              기간:
              {data.startdate == null
                ? null
                : formatter.format(new Date(data.startdate))}
              ~
              {data.fundingduedate == null
                ? null
                : formatter.format(new Date(data.fundingduedate))}
              {/* {data.startdate} ~{data.fundingduedate} */}
            </p>
            <br></br>
            <p id="fundinginfo_description">챌린지 소개:</p>
            <p id="fundinginfo_"> {data.description}</p>
            <br></br>
            <div className="funding_info_btns">
              <FundingInfoButton obj={{ ...state, ...data }} />
            </div>
            <br></br>
            <p id="fundinginfo_description">참여자 목록 </p>
            <FundingMember />
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
