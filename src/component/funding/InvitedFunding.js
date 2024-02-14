import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function InvitedFunding() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const getData = async () => {
    try {
      if (!member_no) {
        console.log("사용자 번호가 없습니다.");
        return;
      }
      const response = await axios.get(
        ` ${bootpath}/funding/member/invitedList?member_no=${member_no}`
      );
      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
      }
      console.log(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">초대받은 펀딩 리스트</h3>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li key={Data.no}>데이터들</li>
              ))}
            </ul>
          ) : (
            <>
              {" "}
              <div>
                초대받은 펀드가 없습니다
                <br /> 펀드를 새로 만들어보세요!
              </div>
              <Link to="/funding/make">펀드 만들기</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default InvitedFunding;
