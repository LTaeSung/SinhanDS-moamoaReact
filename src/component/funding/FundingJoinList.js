import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import bootPath from "../../BootPath";
import FundingJoinListOnGoing from "./FundingJoinListOnGoing";
import FundingJoinListEnd from "./FundingJoinListEnd";
function JoinFundingList() {
  const { bootpath } = useContext(bootPath);

  const [select, setSelected] = useState("0");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
          <select onChange={handleSelect} value={select}>
            <option value="0">진행중</option>
            <option value="1">완료</option>
          </select>
          <div>
            {select === "0" ? <FundingJoinListOnGoing /> : null}
            {select === "1" ? <FundingJoinListEnd /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinFundingList;
