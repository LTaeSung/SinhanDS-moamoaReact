import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import "./FundingList.css";

function FundingList() {
  const bootPath = useContext(BootPathContext);
  const [data, setData] = useState([]);
  const [totalElements, setTotalElement] = useState(0); // 총개수
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const no = params.get("no");

  const getApi = () => {
    axios
      .get(`${bootPath.bootpath}/fund/list/test`)
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
  };

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <div>
            <div style={{ textAlign: "right" }}>
              <Link className="btn" to="/funding/make">
                펀딩 등록하기
              </Link>
            </div>
            <p>
              <span>
                <strong>총 {totalElements} 개 펀딩</strong>
              </span>
            </p>
            <table>
              <caption>펀딩 목록</caption>
              <thead>
                <tr>
                  <th>사진</th>
                  <th>제목</th>
                  <th>상태</th>
                  <th>모금액</th>
                  <th>시작일자</th>
                  <th>남은일자</th>
                </tr>
              </thead>
            </table>
          </div>
          {data.map((item) => (
            <div key={item.no}>
              <p>{item.no}</p>
              <p>{item.photo}</p>
              <Link to="#" onClick={(e) => goinfo(e, item.no)}>
                <p>{item.title}</p>
              </Link>
              <p>{item.state}</p>
              <p>{item.goalamount}</p>
              <p>{item.startdate}</p>
              <p>{item.fundingduedate}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FundingList;
