import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";

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
      <h5>여러가지 통계들 묶음</h5>
      <div>
        <p>인당 평균 정산금액 : {Math.round(data.avgSettlement)}</p>
        <p>펀드당 평균 월결제금액 : {Math.round(data.avgMonthlyPayAmount)}</p>
        <p>
          완료된 펀드당 평균 총 결제금액 :{" "}
          {Math.round(data.avgMonthlyCollected)}
        </p>
        <p>이번달 펀드 총 개최 수 : {data.monthlyNewFund}</p>
        <p>이번달 펀드 총 참여인원 : {data.monthlyMember}</p>
        <p>이번달 펀드 총 금액 : {data.monthlyPay}</p>
      </div>
    </>
  );
}

export default DefaultStatistics;
