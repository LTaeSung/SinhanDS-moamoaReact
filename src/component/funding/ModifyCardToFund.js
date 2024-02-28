import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import CommonImagePath from "../../commonImagePath";
import BootPath from "../../BootPath";
import { useContext } from "react";
import "./ModifyCardToFund.css";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import $ from "jquery";
function ModifyCardToFund() {
  const { commonImagePath } = useContext(CommonImagePath);
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  let no = params.get("no");
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
  const changeRadio = (e) => {
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
  const [select, setSelect] = useState({
    memberNo: member_no,
    fundingNo: no,
  });

  const handleRadioButton = (e) => {
    setSelect({ ...select, payment_no: e.target.value });
  };

  const submit = () => {
    axios
      .post(bootpath + "/funding/member/modifycard", select, {})
      .then((res) => {
        if (res.data === "success") {
          navigate(`/funding/info?no=${no}`);
        }
      });
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
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">결제정보 수정하기</h3>

          <div className="modify_cardinfo">
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
                            <div
                              className="tempCard"
                              data-no={payment.no}
                              onClick={changeRadio}
                            >
                              <input
                                id="inputBox_actf"
                                name="inputBox"
                                data-no={payment.no}
                                type="radio"
                                value={payment.no}
                              ></input>
                              <p id="card_name_actf" data-no={payment.no}>
                                {bankList[payment.company]}카드
                              </p>
                              <p id="card_num_actf" data-no={payment.no}>
                                {payment.account}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div>
                    <button className="card_selbtn" onClick={submit}>
                      카드 선택
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to={`/member/payment/card/add`}>
                    <div>
                      <img
                        className="no_card_search"
                        src={`${commonImagePath}credit_card.png`}
                        alt=""
                        width={100}
                      />
                      <div className="no_card_text">
                        등록된 카드가 없습니다
                        <br /> 카드를 추가해주세요.
                      </div>
                    </div>
                  </Link>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModifyCardToFund;
