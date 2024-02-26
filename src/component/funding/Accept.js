import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
function Accept({ fundingMemberNo, fundingNo }) {
  const location = useLocation();
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  const bankList = ["없음", "신한", "농협", "국민", "우리"];

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

  const submit = (e) => {
    if (!("payment_no" in select) || select.payment_no === "") {
      alert("정기 결제에 등록할 카드를 선택해주세요.");
      return;
    }
    axios.post(bootpath + "/funding/member/accept", select, {}).then((res) => {
      if (res.data === "success") {
        // navigate("/funding/afterAcceptFunding");

        navigate("/funding/info?no=" + location.state.fundingNo);
        navigate(0);
      }
    });
  };
  const changeRadio = (e) => {
    console.log($(e.target).data("no"));
    let data_no = $(e.target).data("no");
    let target = $("input").map((i, e) => {
      if ($(e).data("no") == data_no) return e;
    });

    $('input[name="inputBox"]').each(function () {
      $(this).prop("checked", false);
    });
    $(target).prop("checked", true);
    changePaymentNo($(e.target).data("no"));
  };
  const changePaymentNo = (no) => {
    setSelect({ ...select, payment_no: no });
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
                        <li key={payment.no}>
                          <div id="card">
                            <div data-no={payment.no} onClick={changeRadio}>
                              <input
                                name="inputBox"
                                data-no={payment.no}
                                id={payment.no}
                                type="radio"
                                value={payment.no}
                              />
                              <p data-no={payment.no}>
                                카드사명: {bankList[payment.company]}
                              </p>
                              <p data-no={payment.no}>
                                카드번호: {payment.account}
                              </p>
                            </div>
                          </div>
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
