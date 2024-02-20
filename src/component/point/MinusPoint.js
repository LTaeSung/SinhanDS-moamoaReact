import MemberHeader from "../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { da, id } from "date-fns/locale";
function MinusPoint() {
  const { bootpath } = useContext(BootPath);

  const [minusPoint, setMinusPoint] = useState({
    amount: "",
  });
  const onChangeAmount = (e) => {
    setMinusPoint({ ...minusPoint, [e.target.name]: e.target.value });
  };

  const [point, setPoint] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const getPoint = async () => {
    try {
      if (!member_no) {
        alert("사용자 정보에 오류가 있습니다. 다시 로그인 해주세요.");
        return;
      }
      const response = await axios.get(
        ` ${bootpath}/point/point_history/mypoint?member_no=${member_no}`
      );
      setPoint(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPoint();
  }, []);

  const [payment, setPayment] = useState([]);
  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        const response = await axios.get(
          `${bootpath}/member/payment/list?member_no=${member_no}`
        );
        setPayment(response.data);
      } catch (error) {
        console.error("결제수단을 가져오던 중 에러 발생:", error);
      }
    };

    fetchPaymentList();
  }, []);

  const [select, setSelect] = useState({
    merchant_id: "",
  });
  const handleRadioButton = (e) => {
    setSelect({ ...select, merchant_id: e.target.value });
  };

  const requestPayBack = async () => {
    const data = {
      member_no: member_no,
      amount: minusPoint.amount,
      merchant_id: select.merchant_id,
    };
    if (minusPoint.amount > point) {
      alert("보유 포인트보다 많은 금액을 인출할 수 없습니다.");
      return;
    }
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
          현재 보유 포인트 : {point} 원
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="인출할 금액을 입력해주세요"
            onChange={onChangeAmount}
          />
          <button onClick={requestPayBack}>인출하기</button>
          <div>
            <>
              {payment.filter((payment) => payment.paymenttype === 0).length >
              0 ? (
                <ul>
                  {payment
                    .filter((payment) => payment.paymenttype === 0) // 계좌만 필터
                    .map((payment, i) => (
                      <li key={i}>
                        <input
                          id={i}
                          type="radio"
                          value={payment.company + "_" + payment.account}
                          checked={
                            select.merchant_id ===
                            payment.company + "_" + payment.account
                          }
                          onChange={handleRadioButton}
                        />
                        <p>은행명: {payment.company}</p>
                        <p>계좌번호: {payment.account}</p>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>
                  등록된 계좌가 없습니다. 계좌를 추가해주세요.{" "}
                  <Link to="/member/payment/account/add">계좌 추가</Link>
                </p>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default MinusPoint;
