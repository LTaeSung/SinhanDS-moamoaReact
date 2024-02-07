import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function MiusPoint() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원가입</h3>
        </div>
      </div>
    </>
  );
}

export default MiusPoint;
