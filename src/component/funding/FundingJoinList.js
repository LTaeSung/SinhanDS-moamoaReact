import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bootPath from "../../BootPath";
import CommonImagePath from "../../commonImagePath";
function JoinFundingList() {
  const { bootpath } = useContext(bootPath);

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
        </div>
      </div>
    </>
  );
}

export default JoinFundingList;
