import React, { useEffect } from "react";
import axios from "axios";

const Iamport = (props) => {
  const amount = props.amount;

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = (props) => {
    const { IMP } = window;
    IMP.init("imp40688663");

    IMP.request_pay(
      {
        pg: "html5_inicis.INIBillTst",
        pay_method: "card",
        merchant_uid: new Date().getTime(), //주문번호, 우리가 생성해서 넣어줘야함, 매 결제 요청 시 고유한 번호여야함, 40바이트 이내, 이미 승인완료 처리된 주문번호 또 들어가면 거절처리됨.
        name: "테스트 상품", //주문명, 수정필요
        amount: amount, //결제가격, 수정필요
        buyer_email: "jhyoo1224@naver.com", //구매자 관련 정보는 우리 테이블에 맞춰서
        buyer_name: "류정현",
        buyer_tel: "010-2077-5186",
      },
      async (rsp) => {
        if (rsp.success) {
          await axios.post(
            "http://localhost:8090/point/point_history/chargeIamport"
          ); //서버단에서 뭔가 결과값을 받아와야 할듯(결제 성공, 실패)
          alert("포인트 충전 성공");
        } else {
          alert("결제 실패"); //서버단에서 데이터 저장 실패 시, 결제 취소 요청
        }
        /*try {
          const { data } = await axios.post(
            "http://localhost:8090/verifyIamport/" + rsp.imp_uid //imp_uid는 포트원 고유 결제번호(결제 실패 시 null)
          );
          if (rsp.paid_amount === data.response.amount) {
            alert("결제 성공");
          } else {
            alert("결제 실패");
          }
        } catch (error) {
          console.error("Error while verifying payment:", error);
          alert("결제 실패");
        }*/
      }
    );
  };

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Iamport;
