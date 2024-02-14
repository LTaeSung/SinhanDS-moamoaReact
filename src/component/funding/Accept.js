import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Accept() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
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
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀드에 참여할 카드 선택</h3>
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
    </>
  );
}

export default Accept;
