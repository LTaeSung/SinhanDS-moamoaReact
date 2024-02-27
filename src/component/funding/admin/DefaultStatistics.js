import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import "./Statistics.css";

function DefaultStatistics() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/statistics/default`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="defaultStatistics">
        <p className="chartBigTitle">주요 통계</p>
        <div className="statisticsGroup">
          <p>
            인당 평균 정산금액 :{" "}
            <span className="redtext">{Math.round(data.avgSettlement)}</span>원
          </p>
          <p>
            챌린지당 평균 월결제금액 :{" "}
            <span className="redtext">
              {Math.round(data.avgMonthlyPayAmount)}
            </span>
            원
          </p>
          <p>
            완료된 챌린지당 평균 총 결제금액 :{" "}
            <span className="redtext">
              {Math.round(data.avgMonthlyCollected)}
            </span>
            원
          </p>
          <p>
            이번달 챌린지 총 개최 수 :{" "}
            <span className="redtext">{data.monthlyNewFund}</span>개
          </p>
          <p>
            이번달 챌린지 총 참여인원 :{" "}
            <span className="redtext">{data.monthlyMember}</span>명
          </p>
          <p>
            이번달 챌린지 총 금액 :{" "}
            <span className="redtext">{data.monthlyPay}</span>원
          </p>
        </div>
      </div>
    </>
  );
}

export default DefaultStatistics;
