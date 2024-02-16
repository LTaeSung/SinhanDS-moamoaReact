import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";
function FundingHostList() {
  const { bootpath } = useContext(bootPath);
  const { registedImagePath } = useContext(RegistedImagePath);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [totalElements, setTotalElement] = useState(0); // 총개수
  const start_member_no = sessionStorage.getItem("no");
  const getApi = async () => {
    axios
      .get(`${bootpath}/fund/host?start_member_no=${start_member_no}`)
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

  const goinfo = (e, no) => {
    e.preventDefault();
    navigate("/funding/info?no=" + no);
    console.log(no);
  };

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <div>
            <div style={{ textAlign: "right" }}></div>
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

          {data.length !== 0 ? (
            data.map((item) => (
              <div key={item.no}>
                사진:
                <img
                  src={`${registedImagePath}${item.photo}`}
                  width="100"
                  alt="펀딩 사진"
                />
                <Link to="#" onClick={(e) => goinfo(e, item.no)}>
                  <p>제목: {item.title}</p>
                </Link>
                <p>상태: {item.state}</p>
                <p>모금액: {item.goalamount}</p>
                <p>시작날짜: {item.startdate}</p>
                <p>마감일: {item.fundingduedate}</p>
                <br />
                <br />
              </div>
            ))
          ) : (
            <>
              <div>
                주최한 펀드가 없습니다
                <br /> 펀드를 새로 만들어보세요!
              </div>
              <Link to="/funding/make">펀드 만들기</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FundingHostList;
