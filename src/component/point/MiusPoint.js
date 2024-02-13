import MemberHeader from "./../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
function MinusPoint() {
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

  const requestPayBack = async () => {
    const data = {
      member_no: member_no,
      amount: plusPoint.amount,
    };
    try {
      const result = await axios.post(
        bootpath + "/point/point_history/payBack",
        null,
        { params: data }
      );
      if (result.data === "success") {
        alert("포인트 인출 성공");
        //성공 시 회원정보 페이지로 돌아가던가 해줘야할듯
      }
    } catch (error) {
      alert(
        "문제가 발생했습니다. 같은 현상이 반복될 경우 관리자에게 문의하세요."
      );
    }
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">포인트 인출하기</h3>
          현재 보유 포인트 : {data} 원
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="인출할 금액을 입력해주세요"
            onChange={onChangeAmount}
          />
          <button onClick={requestPayBack}>인출하기</button>
        </div>
      </div>
    </>
  );
}

export default MinusPoint;
