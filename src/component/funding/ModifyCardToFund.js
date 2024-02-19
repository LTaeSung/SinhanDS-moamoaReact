import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
function ModifyCardToFund({ no }) {
  const location = useLocation();
  console.log("location.state.no" + location.state.no);
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    //여기의 no는 fundingInfo(펀딩상세)에서 state로 넘겨준 펀딩의 no
    console.log("현재 펀딩의 no:" + location.state.no);
    console.log("로그인한 멤버 no:" + member_no);

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
    fundingMemberNo: member_no,
    fundingNo: location.state.no,
  });
  const handleRadioButton = (e) => {
    setSelect({ ...select, payment_no: e.target.value });
    console.log(select);
  };

  const submit = () => {
    axios
      .post(bootpath + "/funding/member/modifycard", select, {})
      .then((res) => {
        if (res.data === "success") {
          navigate(`/funding/info?no=${location.state.no}`);
        }
      });
  };
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">결제정보 수정하기</h3>

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

export default ModifyCardToFund;
