import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AccountList.css";

function AccountList() {
  const { bootpath } = useContext(BootPath);
  const [payment, setPayment] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const navigate = useNavigate();
  const bankList = [
    "없음",
    "신한",
    "KEB하나",
    "SC제일",
    "국민",
    "외환",
    "우리",
    "한국시티",
    "농협",
    "기업",
    "수협",
    "경남",
    "광주",
    "대구",
    "부산",
    "전북",
    "제주",
    "한국산업",
    "한국수출입",
  ];

  const [formData, setFormData] = useState({
    //전송할 데이터, 여기에서는 선택한 no만 전송해서 삭제요청
    no: 0,
    memberno: member_no,
  });

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

  useEffect(() => {
    if (formData.no !== 0) {
      // formData.no가 0이 아닌 경우에만 AccountDel을 호출
      AccountDel();
    }
  }, [formData.no]);

  const AccountNo = (no) => {
    setFormData({
      ...formData,
      no: no,
    });
  };

  const AccountDel = async () => {
    try {
      const response = await axios.post(
        `${bootpath}/member/payment/delete`,
        formData
      );

      if (response.data.result === "del_success") {
        alert("계좌정보 삭제 성공");
        // 삭제 Success인 경우, 마이페이지 새로고침해서 변경내역 반영
        window.location.reload();
      } else if (response.data.result === "del_fail") {
        alert("계좌정보 삭제 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <div class="account_container">
        {member_no ? (
          <>
            {payment.filter((payment) => payment.paymenttype === 0).length >
            0 ? (
              <ul>
                {payment
                  .filter((payment) => payment.paymenttype === 0) // 계좌만 필터
                  .map((payment) => (
                    <li key={payment.no}>
                      <div className="rounded-square">
                        <table>
                          <tbody>
                            <tr>
                              <td className="table_font">
                                은행명: {bankList[payment.company]}
                              </td>
                              <td rowSpan={2}>
                                <button className="account_delete">
                                  <Link onClick={() => AccountNo(payment.no)}>
                                    계좌 삭제
                                  </Link>
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td className="table_font_no">
                                계좌번호: {payment.account}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>계좌가 없습니다.</p>
            )}
            <Link to="/member/payment/account/add">
              <p className="account_add">+ 계좌 추가</p>
            </Link>
          </>
        ) : (
          <p>
            {" "}
            <Link to="/">로그인 해주세요.</Link>
          </p>
        )}
      </div>
    </>
  );
}

export default AccountList;
