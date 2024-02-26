import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberHeader from "./../MemberHeader";
import { useNavigate } from "react-router-dom";
import "./AddAccountList.css";

function AddAccountList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no") || "";
  const navigate = useNavigate();
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

    if (
      !("company" in formData) ||
      formData.company === "0" ||
      formData.company === null ||
      formData.company === ""
    ) {
      alert("카드사를 선택해주세요.");
      e.preventDefault();
      return;
    } else if (formData.account.length < 10 || formData.account.length > 14) {
      alert("계좌번호를 형식에 맞체 입력해주세요.");
      e.preventDefault();
      return;
    }

    try {
      const response = await axios.post(
        `${bootpath}/member/payment/add`,
        formData
      );

      console.log("서버 응답:", response.data);

      if (response.data.result === "success") {
        // Success인 경우, 계좌 리스트 페이지로 이동
        navigate("/member/info");
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
          <div className="space_container"></div>
          <h3 className="sub_title_add_acc">계좌 등록</h3> <br />
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
            <br />
            은행명:{" "}
            <input
              type="number"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            /> */}

            <div id="addacc_title">
              은행 명
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
              계좌 번호
              <input
                type="number"
                name="account"
                className="input_lane"
                value={formData.account}
                onChange={handleInputChange}
                placeholder="'-'는 제외하고 숫자만 입력"
                min={0}
              />
              <br />
            </div>
            <br />
            <button id="addacc_btn" type="submit">
              계좌 등록
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAccountList;
