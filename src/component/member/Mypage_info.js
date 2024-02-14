import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";
import Accountlist from "./payment/AccountList";
import Cardlist from "./payment/CardList";
import MemberInfo from "./MemberInfo";

function Mypage_info() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />

      <div className="sub">
        <div className="size">
          <MemberInfo />
          <Accountlist />
          <Cardlist />
        </div>
      </div>
    </>
  );
}

export default Mypage_info;
