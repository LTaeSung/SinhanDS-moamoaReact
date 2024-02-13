import MemberHeader from "./../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
import Iamport from "./iamport";

function PlusPoint() {
  const { bootpath } = useContext(BootPath);

  const [plusPoint, setPlusPoint] = useState({
    amount: "",
  });

  const onChangeAmount = (e) => {
    setPlusPoint({ ...plusPoint, [e.target.name]: e.target.value });
  };

  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const getData = async () => {
    try {
      if (!member_no) {
        alert("사용자 정보에 오류가 있습니다. 다시 로그인 해주세요.");
        return;
      }
      const response = await axios.get(
        ` ${bootpath}/point/point_history/mypoint?member_no=${member_no}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">포인트 충전하기</h3>
          현재 보유 포인트 : {data} 원
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="충전할 금액을 입력해주세요"
            onChange={onChangeAmount}
          />
          <Iamport amount={plusPoint.amount} />
        </div>
      </div>
    </>
  );
}

export default PlusPoint;
