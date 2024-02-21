import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberHeader from "../MemberHeader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function AddCardList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no") || "";
  const navigate = useNavigate();
  const { address } = useParams();

  const [formData, setFormData] = useState({
    //전송할 데이터 필드
    memberno: member_no,
    paymenttype: 1, //카드인경우 type이 1
    company: "",
    account: "",
    validdate_month: "",
    validdate_year: "",
    validdate: "",
    // validdate: formData.validdate_month + " / " + formData.validdate_year,
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
    console.log(formData.validdate);
    formData.validdate =
      formData.validdate_month + " / " + formData.validdate_year;
    console.log(formData.validdate);

    try {
      const response = await axios.post(
        `${bootpath}/member/payment/add`,
        formData
      );

      console.log("서버 응답:", response.data);

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
          <h3 className="sub_title">카드 추가</h3>
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
            카드사명:{" "}
            <input
              type="number"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
            <br />
            카드번호:{" "}
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleInputChange}
            />
            <br />
            유효기간:{" "}
            <input
              type="text"
              name="validdate_month"
              value={formData.validdate_month}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="validdate_year"
              value={formData.validdate_year}
              onChange={handleInputChange}
            />
            <br />
            CVC:{" "}
            <input
              type="number"
              name="cvc"
              value={formData.cvc}
              onChange={handleInputChange}
            />
            <br />
            <button type="submit">카드 추가</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCardList;
