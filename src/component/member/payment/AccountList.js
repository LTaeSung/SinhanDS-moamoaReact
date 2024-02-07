import MemberHeader from "./MemberHeader";
import React from "react";
import PaymentHeader from "./PaymentHeader";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
function Accountlist() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <PaymentHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">계좌 등록</h3>
        </div>
      </div>
    </>
  );
}
export default Accountlist;
