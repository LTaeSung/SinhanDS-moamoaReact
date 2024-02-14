import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberHeader from "./../MemberHeader";
import { useNavigate } from "react-router-dom";

function AddAccountList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no") || "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    //전송할 데이터 필드
    memberno: member_no,
    paymenttype: 0, //계좌인경우 type이 0
    company: "",
    account: "",
    validdate: null,
    cvc: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${bootpath}/member/payment/add`,
        formData
      );

      console.log("서버 응답:", response.data);

      if (response.data.result === "success") {
        // Success인 경우, 계좌 리스트 페이지로 이동
        navigate("/member/payment/account");
      } else if (response.data.result === "exists") {
        alert("이미 동일한 계좌가 존재합니다.");
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
          <h3 className="sub_title">계좌 추가</h3>
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
            은행명:{" "}
            <input
              type="number"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
            <br />
            계좌번호:{" "}
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleInputChange}
            />
            <br />
            <button type="submit">계좌 추가</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAccountList;
