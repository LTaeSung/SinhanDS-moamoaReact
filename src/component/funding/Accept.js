import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
function Accept({ fundingMemberNo, fundingNo }) {
  const location = useLocation();
  console.log("fundingNo: " + location.state.fundingNo);
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const navigate = useNavigate();
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
    fundingMemberNo: location.state.fundingMemberNo,
  });
  console.log("typeof: " + typeof select.fundingMemberNo);
  const handleRadioButton = (e) => {
    setSelect({ ...select, payment_no: e.target.value });
    console.log(select);
  };

  const submit = () => {
    axios.post(bootpath + "/funding/member/accept", select, {}).then((res) => {
      if (res.data === "success") {
        // navigate("/funding/afterAcceptFunding");
        navigate("/funding/info?no=" + location.state.fundingNo);
      }
    });
  };
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">결제카드 선택</h3>

          <div>
            <>
              {payment.filter((payment) => payment.paymenttype === 1).length >
              0 ? (
                <>
                  <ul>
                    {payment
                      .filter((payment) => payment.paymenttype === 1) // 카드만 필터
                      .map((payment, i) => (
                        <li key={i}>
                          <input
                            name="inputBox"
                            id={i}
                            type="radio"
                            value={payment.no}
                            onChange={handleRadioButton}
                          />
                          <p>카드사명: {payment.company}</p>
                          <p>카드번호: {payment.account}</p>
                        </li>
                      ))}
                  </ul>
                  <div>
                    <button className="btn" onClick={submit}>
                      카드 선택
                    </button>
                  </div>
                </>
              ) : (
                <p>
                  등록된 카드가 없습니다. 카드를 추가해주세요.{" "}
                  <Link to="/member/payment/card/add">카드 추가</Link>
                </p>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accept;
