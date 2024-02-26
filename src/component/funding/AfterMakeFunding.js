import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AfterMakeFunding.css";
function afterMakeFunding() {
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title_make"> 챌린지가 등록되었습니다.</h3>
          <div className="aftermakeinfo">
            초대 수락 가능 기한은 초대 날짜 기준 일주일이며, 기한이 지날 때까지
            수락하지 않거나 거절한 멤버를 제외하고 챌린지가 진행됩니다.
          </div>
        </div>
        <Link to="/funding/host" id="view_myfund">
          내가 주최한 챌린지 보기
        </Link>
      </div>
    </>
  );
}

export default afterMakeFunding;
