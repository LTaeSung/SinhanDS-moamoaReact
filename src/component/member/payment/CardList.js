import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Accountlist() {
  const { bootpath } = useContext(BootPath);
  const [payment, setPayment] = useState([]);
  const member_no = sessionStorage.getItem("no");

  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        // Axios를 사용하여 API 호출
        const response = await axios.get(
          `${bootpath}/member/payment/list?member_no=${member_no}`
        );

        // 응답이 성공하면 데이터를 상태에 저장
        setPayment(response.data);
      } catch (error) {
        console.error("결제수단을 가져오던 중 에러 발생:", error);
      }
    };

    // 데이터 가져오기 함수 호출
    fetchPaymentList();
  }, [member_no]);

  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">내 카드</h3>
          <div>
            {member_no ? (
              <>
                {payment.filter((payment) => payment.paymenttype === 1).length >
                0 ? (
                  <ul>
                    {payment
                      .filter((payment) => payment.paymenttype === 1) // 카드만 필터
                      .map((payment) => (
                        <li key={payment.id}>
                          <p>결제수단: 카드</p>
                          <p>은행명: {payment.company}</p>
                          <p>카드번호: {payment.account}</p>
                          <p>
                            유효기간:
                            {payment.validdate
                              ? payment.validdate.substring(0, 10)
                              : null}
                          </p>
                          <p>CVC: {payment.cvc}</p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>카드가 없습니다.</p>
                )}
                <Link to="/member/payment/card/add">카드 추가</Link>
              </>
            ) : (
              <p>
                <Link to="/">로그인 해주세요.</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accountlist;
