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
        <p>인당 평균 정산금액 : {Math.round(data.avgSettlement)} 원</p>
        <p>
          펀드당 평균 월결제금액 : {Math.round(data.avgMonthlyPayAmount)} 원
        </p>
        <p>
          완료된 펀드당 평균 총 결제금액 :{" "}
          {Math.round(data.avgMonthlyCollected)} 원
        </p>
        <p>이번달 펀드 총 개최 수 : {data.monthlyNewFund} 개</p>
        <p>이번달 펀드 총 참여인원 : {data.monthlyMember} 명</p>
        <p>이번달 펀드 총 금액 : {data.monthlyPay} 원</p>
      </div>
    </>
  );
}

export default DefaultStatistics;
