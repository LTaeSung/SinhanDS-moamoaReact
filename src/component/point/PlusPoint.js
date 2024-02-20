import MemberHeader from "./../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
import Iamport from "./iamport";
import "./PlusPoint.css";

function PlusPoint() {
  const { bootpath } = useContext(BootPath);

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

  const [plusPoint, setPlusPoint] = useState({
    amount: "",
  });
  const onChangeAmount = (e) => {
    setPlusPoint({ ...plusPoint, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <div className="space_container"></div>
          <h3 className="sub_title">포인트 충전하기</h3>
          <div className="space_container"></div>

          <div className="cash_container">
            <p className="cash_font">현재 보유 포인트 :</p>
            <p className="cash_color">{data}</p>
          </div>

          <input
            className="input_amount"
            id="amount"
            name="amount"
            type="number"
            placeholder="충전할 금액을 입력해주세요"
            onChange={onChangeAmount}
          />
          <div className="add_container"></div>

          <Iamport amount={plusPoint.amount} />
        </div>
      </div>
    </>
  );
}

export default PlusPoint;
