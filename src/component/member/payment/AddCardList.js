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
  const bankList = ["선택", "신한", "농협", "국민", "우리", "뭐시기"];

  const [formData, setFormData] = useState({
    //전송할 데이터 필드
    memberno: member_no,
    paymenttype: 1, //카드인경우 type이 1
    company: "",
    account1: "0000",
    account2: "0000",
    account3: "0000",
    account4: "0000",
    account: "",
    validdate_month: "01",
    validdate_year: "24",
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
          <h3 className="sub_title">신용카드 등록</h3> <br />
          <form onSubmit={handleSubmit}>
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
              카드사 / 카드번호 <br />
              <select onChange={handleInputChange} name="company">
                {bankList.map((option, idx) => (
                  <option key={idx} value={idx}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="account1"
                id="addcard_num"
                value={formData.account1}
                onChange={handleInputChange}
              />{" "}
              -
              <input
                type="number"
                name="account2"
                id="addcard_num"
                value={formData.account2}
                onChange={handleInputChange}
              />{" "}
              -
              <input
                type="number"
                name="account3"
                id="addcard_num"
                value={formData.account3}
                onChange={handleInputChange}
              />{" "}
              -
              <input
                type="number"
                name="account4"
                id="addcard_num"
                value={formData.account4}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <p id="addcard_limitdate">카드 유효기간</p>
            <input
              type="number"
              name="validdate_month"
              id="addcard_limitnum"
              value={formData.validdate_month}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="validdate_year"
              id="addcard_limitnum"
              value={formData.validdate_year}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <p id="addcard_cvc">CVC</p>
            <input
              type="number"
              name="cvc"
              id="addcard_input"
              value={formData.cvc}
              onChange={handleInputChange}
            />
            <br />
            <br />
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
