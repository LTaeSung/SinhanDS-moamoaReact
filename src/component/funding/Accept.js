import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function Accept() {
  const { bootpath } = useContext(BootPath);

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀드에 참여할 카드 선택</h3>
        </div>
      </div>
    </>
  );
}

export default Accept;
