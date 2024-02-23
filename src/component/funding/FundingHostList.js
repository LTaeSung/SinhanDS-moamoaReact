import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import bootPath from "../../BootPath";
import FundingHostListOnGoing from "./FundingHostListOnGoing";
import FundingHostListEnd from "./FundingHostListEnd";
import { Link } from "react-router-dom";
import "./FundingHostList.css";

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
          <div className="space_container"></div>
          <h3 className="sub_title_host_funding">주최한 챌린지 리스트</h3>
          <div className="space_container"></div>
          <div className="select_container">
            <div className="fund_div">
              <Link id="make_funding_btn" to={"/funding/make"}>
                <button className="create_fund">챌린지 만들기</button>
              </Link>
            </div>
            <div>
              <select id="option_host" onChange={handleSelect} value={select}>
                <option value="0">진행중</option>
                <option value="1">완료</option>
              </select>
            </div>
          </div>
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
