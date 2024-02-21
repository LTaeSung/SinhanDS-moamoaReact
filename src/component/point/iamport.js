import React, { useEffect, useContext } from "react";
import axios from "axios";
import BootPath from "../../BootPath";

const Iamport = (props) => {
  const { bootpath } = useContext(BootPath);
  const amount = props.amount;
  const buyer_email = sessionStorage.getItem("email");
  const buyer_no = sessionStorage.getItem("no");

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
    if (amount <= 0) {
      alert("0원 이하의 금액을 충전할 할 수 없습니다.");
      return;
    }

    const { IMP } = window;
    IMP.init("imp40688663");

    IMP.request_pay(
      {
        pg: "html5_inicis.INIBillTst",
        pay_method: "card",
        merchant_uid: new Date().getTime() + "_" + buyer_no,
        //주문번호, 우리가 생성해서 넣어줘야함, 매 결제 요청 시 고유한 번호여야함, 40바이트 이내, 이미 승인완료 처리된 주문번호 또 들어가면 거절처리됨.
        name: "포인트 결제",
        amount: amount,
        buyer_email: buyer_email,
        buyer_name: buyer_no,
      },
      async (rsp) => {
        if (rsp.success) {
          const data = {
            imp_uid: rsp.imp_uid, //아임포트에서 결제 승인해준 번호
            merchant_uid: rsp.merchant_uid, //우리가 위에서 보낸 결제 요청 번호
            paid_amount: rsp.paid_amount, //결제된 금액
            buyer_no: rsp.buyer_name, //회원번호(우리가 위에서 보낸 buyer_name과 동일함)
          };
          try {
            const result = await axios.post(
              bootpath + "/point/point_history/chargeIamport",
              null,
              { params: data }
            );
            if (result.data === "success") {
              alert("포인트 충전 성공");
              //성공 시 회원정보 페이지로 돌아가던가 해줘야할듯
            }
          } catch (error) {
            const data = {
              imp_uid: rsp.imp_uid, //아임포트에서 결제 승인해준 번호
            };
            await axios.post(
              bootpath + "/point/point_history/cancleIamport",
              null,
              { params: data }
            );
            alert("포인트 충전 실패, 결제 취소 처리됨");
          }
        } else {
          alert("결제 오류");
        }
      }
    );
  };

  return (
    <div>
      <button className="add_money" onClick={requestPay}>
        충전하기
      </button>
    </div>
  );
};

export default Iamport;
