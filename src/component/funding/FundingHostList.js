import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import bootPath from "../../BootPath";
import FundingHostListOnGoing from "./FundingHostListOnGoing";
import FundingHostListEnd from "./FundingHostListEnd";
function FundingHostList() {
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
          <h3 className="sub_title">주최한 펀딩 리스트</h3>
          <select onChange={handleSelect} value={select}>
            <option value="0">진행중</option>
            <option value="1">완료</option>
          </select>
          <div>
            {select === "0" ? <FundingHostListOnGoing /> : null}
            {select === "1" ? <FundingHostListEnd /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default FundingHostList;
