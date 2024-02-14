import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import CommonImagePath from "../../commonImagePath";
function JoinFundingList() {
  const { bootpath } = useContext(bootPath);
  const { commonImagePath } = useContext(CommonImagePath);
  const [data, setData] = useState([]);
  const [totalElements, setTotalElement] = useState(0); // 총개수
  const member_no = sessionStorage.getItem("no");
  const getApi = async () => {
    axios
      .get(
        `${bootpath}/funding/member/join?member_no=${member_no}&start_member_no=${member_no}`
      )
      .then((res) => {
        setData(res.data);
        setTotalElement(res.data.length);
      })
      .catch((error) => {
        console.log("진행중인 펀딩이 없습니다.", error);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
          <div>
            <p>
              <span>
                <strong>총 {totalElements} 개 펀딩</strong>
              </span>
            </p>
            <table>
              <caption>주최한 펀딩 목록</caption>
              <thead>
                <tr>
                  <th>사진</th>
                  <th>제목</th>
                  <th>상태</th>
                  <th>모금액</th>
                  <th>시작일자</th>
                  <th>마감일</th>
                </tr>
              </thead>
            </table>
          </div>
          {data.map((item) => (
            <>
              {" "}
              <div key={item.no}>
                사진:
                <img src={`${commonImagePath}${item.photo}`} width="100" />
                <Link to={"/funding/list/{item.no}"}>
                  <p>제목: {item.fund_title}</p>
                </Link>
                <p>상태:{item.state}</p>
                <p>모금액:{item.goalamount}</p>
                <p>시작날짜:{item.startdate}</p>
                <p>마감일:{item.fundingduedate}</p>
              </div>
              <br />
              <br />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default JoinFundingList;
