import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberHeader from "../MemberHeader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./AddCardList.css";

function AddCardList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no") || "";
  const navigate = useNavigate();
  const { address } = useParams();
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
  ];

  const [formData, setFormData] = useState({
    //전송할 데이터 필드
    memberno: member_no,
    paymenttype: 1, //카드인경우 type이 1
    company: "",
    account1: "",
    account2: "",
    account3: "",
    account4: "",
    account: "",
    validdate_month: "",
    validdate_year: "",
    validdate: "",
    cvc: "",
  });

  //입력폼 값을 바꿀 때마다 formdata에 저장
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.validdate =
      formData.validdate_month + " / " + formData.validdate_year;
    formData.account =
      formData.account1 +
      "-" +
      formData.account2 +
      "-" +
      formData.account3 +
      "-" +
      formData.account4;

    if (
      !("company" in formData) ||
      formData.company === "0" ||
      formData.company === null ||
      formData.company === ""
    ) {
      alert("카드사를 선택해주세요.");
      e.preventDefault();
      return;
    } else if (
      formData.account1.length !== 4 ||
      formData.account2.length !== 4 ||
      formData.account3.length !== 4 ||
      formData.account4.length !== 4
    ) {
      alert("카드 번호를 양식에 맞춰 입력해주세요.");
      e.preventDefault();
      return;
    } else if (
      formData.validdate_month.length !== 2 ||
      formData.validdate_year.length !== 2
    ) {
      alert("유효 기간을 양식에 맞춰 입력해주세요.");
      e.preventDefault();
      return;
    } else if (
      formData.validdate_month != "01" &&
      formData.validdate_month != "02" &&
      formData.validdate_month != "03" &&
      formData.validdate_month != "04" &&
      formData.validdate_month != "05" &&
      formData.validdate_month != "06" &&
      formData.validdate_month != "07" &&
      formData.validdate_month != "08" &&
      formData.validdate_month != "09" &&
      formData.validdate_month != "10" &&
      formData.validdate_month != "11" &&
      formData.validdate_month != "12"
    ) {
      alert("1월 ~ 12월 이내의 유효기간을 입력해주세요.");
      e.preventDefault();
      return;
    } else if (formData.cvc.length !== 3) {
      alert(
        "cvc번호를 양식에 맞춰 입력해주세요(cvc는 카드 뒷면에 적힌 번호 맨 뒤 세자리입니다.)"
      );
      e.preventDefault();
      return;
    }

    try {
      const response = await axios.post(
        `${bootpath}/member/payment/add`,
        formData
      );

      if (response.data.result === "success") {
        // 카드 추가가 성공하면 바로 전으로 돌아가자. 여러 케이스에 다 적용가능함(새로고침된 상태라 추가한 카드가 보임)
        navigate(-1);
      } else if (response.data.result === "exists") {
        // 동일 체크는 account로 한다.
        alert("이미 동일한 카드가 존재합니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <div className="space_container"></div>
          <h3 className="sub_title_add_card">신용카드 등록</h3> <br />
          <form onSubmit={handleSubmit}>
            <div className="newSize">
              {/* <input
              type="hidden"
              name="memberno"
              value={formData.memberno || ""}
            />
            <input
              type="hidden"
              name="paymenttype"
              value={formData.paymenttype || ""}
            />
            <br /> */}
              {/*<input
              type="number"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />*/}
              <div id="addcard_title">
                카드사
                <br />
                <select
                  className="input_lane_select_box"
                  onChange={handleInputChange}
                  name="company"
                >
                  {bankList.map((option, idx) => (
                    <option key={idx} value={idx}>
                      {option}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                카드 번호 (숫자만 입력)
                <br />
                <input
                  type="text"
                  pattern="\d*"
                  name="account1"
                  id="addcard_num"
                  value={formData.account1}
                  onChange={handleInputChange}
                  placeholder="0000"
                  maxLength="4"
                />{" "}
                -
                <input
                  type="text"
                  pattern="\d*"
                  name="account2"
                  id="addcard_num"
                  value={formData.account2}
                  onChange={handleInputChange}
                  placeholder="0000"
                  maxLength="4"
                />{" "}
                -
                <input
                  type="text"
                  pattern="\d*"
                  name="account3"
                  id="addcard_num"
                  value={formData.account3}
                  onChange={handleInputChange}
                  placeholder="0000"
                  maxLength="4"
                />{" "}
                -
                <input
                  type="text"
                  pattern="\d*"
                  name="account4"
                  id="addcard_num"
                  value={formData.account4}
                  onChange={handleInputChange}
                  placeholder="0000"
                  maxLength="4"
                />
              </div>
              <br />
              <p id="addcard_limitdate">
                카드 유효기간
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CVC
              </p>
              <input
                type="text"
                pattern="\d*"
                name="validdate_month"
                id="addcard_limitnum"
                value={formData.validdate_month}
                onChange={handleInputChange}
                placeholder="MM"
                maxLength="2"
              />
              <input
                type="text"
                pattern="\d*"
                name="validdate_year"
                id="addcard_limitnum"
                value={formData.validdate_year}
                onChange={handleInputChange}
                placeholder="YY"
                maxLength="2"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                pattern="\d*"
                name="cvc"
                id="addcard_input"
                value={formData.cvc}
                onChange={handleInputChange}
                placeholder="000"
                maxLength="3"
              />
              <br />
              <br />
            </div>
            <div className="btn_area">
              <button id="addcard_btn" type="submit">
                카드 추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCardList;
