import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function FundingInfo() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩 상세내역</h3>
        </div>
      </div>
    </>
  );
}

export default FundingInfo;
