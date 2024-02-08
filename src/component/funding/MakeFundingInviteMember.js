import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
function MakeFundingInviteMember({ state }) {
  const { bootpath } = useContext(BootPath);
  const location = useLocation();
  //   const param = location.state.param;
  const [param, setParam] = useState({ ...location.state.param });
  const [member, setMember] = useState({});

  const getMember = () => {
    console.log("ㅎㅎ");
  };
  getMember();
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩 맴버 초대</h3>
        </div>
      </div>
    </>
  );
}

export default MakeFundingInviteMember;
