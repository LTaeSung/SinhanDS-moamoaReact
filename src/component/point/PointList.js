import MemberHeader from "./../member/MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function PointList() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">포인트 정보</h3>
        </div>
      </div>
    </>
  );
}

export default PointList;
