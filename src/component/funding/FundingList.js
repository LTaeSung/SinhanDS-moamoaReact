import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function FundingList() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">모든 펀딩 리스트</h3>
        </div>
      </div>
    </>
  );
}

export default FundingList;
