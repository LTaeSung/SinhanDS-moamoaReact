import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import bootPath from "../../BootPath";
import FundingJoinListOnGoing from "./FundingJoinListOnGoing";
import FundingJoinListEnd from "./FundingJoinListEnd";
import { Link } from "react-router-dom";
import "./FundingJoinList.css";

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
          <div className="space_container"></div>
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
          <div className="space_container"></div>

          <div className="select_container">
            <div className="fund_div">
              <Link id="make_funding_btn" to={"/funding/make"}>
                <button className="create_fund">펀딩 만들기</button>
              </Link>
            </div>

            <div className="search_status">
              <select id="option" onChange={handleSelect} value={select}>
                <option value="0">진행중</option>
                <option value="1">완료</option>
              </select>
            </div>
          </div>

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
