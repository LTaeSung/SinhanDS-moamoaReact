import FundingHeader from "./FundingHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function AfterAcceptFunding() {
  const { bootpath } = useContext(BootPath);

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
          <Link to="/member/info">회원정보로 이동! 이거는 나중에 변경!</Link>
        </div>
      </div>
    </>
  );
}

export default AfterAcceptFunding;
