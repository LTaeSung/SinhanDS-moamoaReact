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
      <div className="temp"></div>
    </>
  );
}
export default Accountlist;
