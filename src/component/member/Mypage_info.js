import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MinusPoint";

import AccountList from "./payment/AccountList";
import CardList from "./payment/CardList";

import Accountlist from "./payment/AccountList";
import Cardlist from "./payment/CardList";
import MemberInfo from "./MemberInfo";

import { Link } from "react-router-dom";
import "./Mypage_info.css";

function Mypage_infocopy() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />

      <div className="sub">
        <div className="size">
          <MemberInfo />
          <Cardlist />
          <Accountlist />
        </div>
        <div>
          <button className="user_leave">
            <Link to={`/member/leavecheck`}>회원 탈퇴</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Mypage_infocopy;
