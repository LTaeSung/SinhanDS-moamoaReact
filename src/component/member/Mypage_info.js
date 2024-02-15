import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";

import AccountList from "./payment/AccountList";
import CardList from "./payment/CardList";

import Accountlist from "./payment/AccountList";
import Cardlist from "./payment/CardList";
import MemberInfoTest from "./MemberInfoTest";

function Mypage_info() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />

      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원정보</h3>

          <MemberInfoTest />
          <Accountlist />
          <Cardlist />
        </div>
      </div>
    </>
  );
}

export default Mypage_info;
