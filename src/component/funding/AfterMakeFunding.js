import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
function afterMakeFunding() {
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩이 등록되었습니다.</h3>
          초대 수락 가능 기한은 초대 날짜 기준 일주일이며, 기한이 지날 때까지
          수락하지 않거나 거절한 멤버를 제외하고 챌린지가 진행됩니다.
        </div>
        <Link to="/funding/host">
          <p> 개최한 펀딩 보기</p>
        </Link>
      </div>
    </>
  );
}

export default afterMakeFunding;
