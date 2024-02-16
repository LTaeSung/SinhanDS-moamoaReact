import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bootPath from "../../BootPath";
import CommonImagePath from "../../commonImagePath";
import $ from "jquery";
function JoinFundingList() {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const getApi = async () => {
    axios
      .get(`${bootpath}/funding/member/join?member_no=${member_no}`)
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  const goToFundInfo = (e) => {
    console.log(e.target);
    // window.location.href = "/funding/info?no=" + $(e.target).attr("value");
  };
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
          <div>
            {data.length > 0 ? (
              <>
                <ul>
                  {data.map((Data) => (
                    <li key={Data.fundingNo}>
                      <Link
                        to={
                          "/funding/info?no=" +
                          Data.fundingNo +
                          "&stateMessage=" +
                          Data.stateMessage
                        }
                      >
                        <div>펀드명 : {Data.title}</div>
                        <div>내가 낸 금액 : {Data.myPayAmount}</div>
                        <div>전체 모인 금액: {Data.totalPayAmount}</div>
                        <div>상태 : {Data.stateMessage}</div>
                        <div>남은 일수 : {Data.dueDateLeft}</div>
                        <div>상태 색 : {Data.color}</div>
                      </Link>

                      <br />
                      <br />
                      <br />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>참여한 펀딩이 없어요!</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinFundingList;
