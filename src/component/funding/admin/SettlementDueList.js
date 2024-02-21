import MemberHeader from "../../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";

function SettlementDueList() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/admin/SettlementDueList`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const requestRefuse = async () => {
    try {
      const result = await axios.get(bootpath + "/admin/setFundStatus2To3");
      if (result.data === "success") {
        alert("정산 마감된 펀딩 완료 상태로 전환 성공");
      } else {
        alert("문제가 발생했습니다.");
      }
    } catch (error) {
      alert("문제가 발생했습니다.");
    }
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">정산마감일 지난 멤버 목록</h3>
          <button onClick={requestRefuse}>펀딩 완료 상태로 전환하기</button>
          <div>
            <ul>
              {data.map((data) => (
                <li key={data.no}>
                  {
                    <ul>
                      <p>펀딩번호 : {data.no}</p>
                      <p>정산마감일자 : {data.settlementduedate}</p>
                      <p>참여자 수 : {data.candidate}</p>
                      <p>모인 금액 : {data.collectedpoint}</p>
                    </ul>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettlementDueList;
