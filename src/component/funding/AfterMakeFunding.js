import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function afterMakeFunding() {
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩 만든 후 이동할 사이트</h3>
          펀드를 만드셨어요!!!
        </div>
      </div>
    </>
  );
}

export default afterMakeFunding;
