import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";
import Accountlist from "./payment/AccountList";
import Cardlist from "./payment/CardList";

function Mypage_info() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />
      {sessionStorage.getItem("email")}
      {sessionStorage.getItem("no")}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원정보</h3>
          <Accountlist />
          <Cardlist />
        </div>
      </div>
    </>
  );
}

export default Mypage_info;
