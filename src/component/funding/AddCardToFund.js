import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
function AddCardToFund({ onSelectCard }) {
  const location = useLocation();
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

  const [select, setSelect] = useState(null);
  const handleRadioButton = (e) => {
    // setSelect({ ...select, payment_no: e.target.value });
    const selectedPaymentNo = e.target.value;
    setSelect({ payment_no: selectedPaymentNo });
    onSelectCard(selectedPaymentNo);
  };
  const changeRadio = (e) => {
    let data_no = $(e.target).data("no");
    let target = $("input").map((i, e) => {
      if ($(e).data("no") == data_no) return e;
    });

    $('input[name="inputBox"]').each(function () {
      $(this).prop("checked", false);
    });
    $(target).prop("checked", true);
  };

  const bankList = ["없음", "신한", "농협", "국민", "우리"];

  // const submit = () => {
  //   axios.post(bootpath + "/funding/addcard", select, {}).then((res) => {
  //     if (res.data === "success") {
  //       navigate("/funding/make");
  //     }
  //   });
  // };

  return (
    <>
      <div>
        <>
          {payment.filter((payment) => payment.paymenttype === 1).length > 0 ? (
            <>
              <ul>
                {payment
                  .filter((payment) => payment.paymenttype === 1) // 카드만 필터
                  .map((payment, i) => (
                    <li key={i}>
                      <div id="card">
                        <div data-no={i} onClick={changeRadio}>
                          <p id="card_name" data-no={i}>
                            {bankList[payment.company]}카드
                          </p>
                          <p id="card_num" data-no={i}>
                            {payment.account}
                          </p>
                          <input
                            id="inputBox"
                            // style={{
                            //   display: "block",
                            //   height: 0,
                            //   width: 0,
                            //   border: 0,
                            //   padding: 0,
                            // }} 라디오버튼 없애기
                            name="inputBox"
                            data-no={i}
                            type="radio"
                            value={payment.no}
                            onChange={handleRadioButton}
                          ></input>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <p>
              등록된 카드가 없습니다. 카드를 추가해주세요.{" "}
              <Link to={`/member/payment/card/add?link=${location.pathname}`}>
                카드 추가
              </Link>
            </p>
          )}
        </>
      </div>
    </>
  );
}

export default AddCardToFund;
