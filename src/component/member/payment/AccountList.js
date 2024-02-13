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
  const member_no = 4; //sessionStorage.getItem("no");

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
  }, [member_no]);

  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">내 계좌</h3>
          <div>
            {member_no ? (
              <>
                {payment.filter((payment) => payment.paymenttype === 0).length >
                0 ? (
                  <ul>
                    {payment
                      .filter((payment) => payment.paymenttype === 0) // 계좌만 필터
                      .map((payment) => (
                        <li key={payment.id}>
                          <p>결제수단: 계좌</p>
                          <p>은행명: {payment.company}</p>
                          <p>계좌번호: {payment.account}</p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>계좌가 없습니다.</p>
                )}
                <Link to="/member/payment/account/add">계좌 추가</Link>
              </>
            ) : (
              <p>로그인 해주세요.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accountlist;
