import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import PlusPoint from "../point/PlusPoint";
function Mypage_info() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />
      {sessionStorage.getItem("email")}
      {sessionStorage.getItem("name")}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원정보</h3>
          <PlusPoint />
        </div>
      </div>
    </>
  );
}

export default Mypage_info;
