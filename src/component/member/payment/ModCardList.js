import React, { useState, useEffect } from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberHeader from "../MemberHeader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ModCardList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no") || "";
  const navigate = useNavigate();
  const { no } = useParams();

  const [formData, setFormData] = useState({
    //전송할 데이터 필드
    no: no,
    memberno: member_no,
    paymenttype: 1, //카드인경우 type이 1
    company: "",
    account: "",
    validdate: "",
    cvc: "",
  });

  useEffect(() => {
    // no를 사용해 선택한 카드정보 가져옴
    const fetchAccountInfo = async () => {
      try {
        const response = await axios.get(
          `${bootpath}/member/payment/getinfo?no=${no}`
        );
        setFormData(response.data); // 서버에서 받아온 데이터로 form을 초기화
      } catch (error) {
        console.error("카드 정보를 가져오는 중 에러 발생:", error);
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

      if (response.data.result === "success") {
        alert("카드정보 수정 성공");
        // Success인 경우, 카드 리스트 페이지로 이동
        navigate("/member/info");
      } else if (response.data.result === "fail") {
        // 사실 수정버튼을 눌렀다는 거 자체가 테이블에 해당 카드의 정보가 존재하는 거라서 fail을 받을 일은 없다.. no로 조회해서 정보가 없는 경우 fail을 쏴주기 때문에..
        alert("카드정보 수정 실패");
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
          <h3 className="sub_title">카드 수정</h3>
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
              name="validdate"
              value={formData.validdate.substring(0, 10)}
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
            <button type="submit">수정하기</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModCardList;
