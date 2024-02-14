import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberHeader from "../MemberHeader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ModAccountList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no") || "";
  const navigate = useNavigate();
  const { no } = useParams();

  const [formData, setFormData] = useState({
    //전송할 데이터 필드
    no: no,
    memberno: member_no,
    paymenttype: 0, //계좌인경우 type이 0
    company: "",
    account: "",
    validdate: null,
    cvc: null,
  });

  useEffect(() => {
    // no를 사용해 선택한 계좌정보 가져옴
    const fetchAccountInfo = async () => {
      try {
        const response = await axios.get(
          `${bootpath}/member/payment/getinfo?no=${no}`
        );
        setFormData(response.data); // 서버에서 받아온 데이터로 form을 초기화
      } catch (error) {
        console.error("계좌 정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchAccountInfo();
  }, [no]);

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
        `${bootpath}/member/payment/modify`,
        formData
      );

      console.log("서버 응답:", response.data);

      if (response.data.result === "success") {
        alert("계좌정보 수정 성공");
        // Success인 경우, 계좌 리스트 페이지로 이동
        navigate("/member/info");
      } else if (response.data.result === "fail") {
        alert("계좌정보 수정 실패");
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
          <h3 className="sub_title">계좌 수정</h3>
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
            <button type="submit">수정하기</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModAccountList;
