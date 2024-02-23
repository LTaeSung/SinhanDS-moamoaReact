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
import $ from "jquery";
import { Link } from "react-router-dom";
import "./Mypage_info.css";

function Mypage_infocopy() {
  const logout = (e) => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("no");
    sessionStorage.removeItem("name");
    goToLink(e);
  };
  const goToLink = (e) => {
    window.location.href = $(e.target).attr("target");
  };
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
          <button className="user_logout" onClick={logout} target="/main">
            로그아웃
          </button>
          <button className="user_leave">
            <Link to={`/member/leavecheck`}>회원 탈퇴</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Mypage_infocopy;
