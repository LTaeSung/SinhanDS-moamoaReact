import MemberHeader from "../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { da, id } from "date-fns/locale";

import $ from "jquery";
import "./MinusPoint.css";

function MinusPoint() {
  const { bootpath } = useContext(BootPath);

  const [minusPoint, setMinusPoint] = useState({
    amount: "",
  });
  const onChangeAmount = (e) => {
    setMinusPoint({ ...minusPoint, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
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
    } else if (minusPoint.amount <= 0) {
      alert("0원 이하의 값을 입력할 수 없습니다.");
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
        navigate("/member/info");
      }
    } catch (error) {
      alert(
        "문제가 발생했습니다. 같은 현상이 반복될 경우 관리자에게 문의하세요."
      );
    }
  };
  const changeRadio = (e) => {
    console.log(e.target);
    let data_no = $(e.target).data("no");
    let target = $("input").map((i, e) => {
      if ($(e).data("no") == data_no) return e;
    });

    $('input[name="inputBox"]').each(function () {
      $(this).prop("checked", false);
    });
    $(target).prop("checked", true);
  };

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

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <div className="space_container"></div>
          <h3 className="sub_title">포인트 인출하기</h3>
          <div className="space_container"></div>

          <div className="cash_container">
            <p className="cash_font">현재 보유 포인트 :</p>
            <p className="cash_color">{point}</p>
          </div>

          <input
            className="input_amount"
            id="amount"
            name="amount"
            type="number"
            placeholder="인출할 금액을 입력해주세요"
            onChange={onChangeAmount}
          />

          <div>
            <>
              {payment.filter((payment) => payment.paymenttype === 0).length >
              0 ? (
                <ul>
                  {payment
                    .filter((payment) => payment.paymenttype === 0) // 계좌만 필터
                    .map((payment, i) => (
                      <li key={i}>
                        {" "}
                        <div id="card">
                          <div
                            className="tempCard"
                            data-no={i}
                            onClick={changeRadio}
                          >
                            <p data-no={i}>
                              은행명: {bankList[payment.company]}
                            </p>
                            <p data-no={i}>계좌번호: {payment.account}</p>
                            <input
                              id="inputBox"
                              name="inputBox"
                              data-no={i}
                              type="radio"
                              value={payment.company + "_" + payment.account}
                              checked={
                                select.merchant_id ===
                                payment.company + "_" + payment.account
                              }
                              onChange={handleRadioButton}
                            />
                          </div>
                        </div>
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
          <button className="min_money" onClick={requestPayBack}>
            인출하기
          </button>
        </div>
      </div>
    </>
  );
}

export default MinusPoint;
