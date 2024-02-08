import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { useLoaderData } from "react-router-dom";
function MakeFundingInviteMember({ state }) {
  const { bootpath } = useContext(BootPath);
  const location = useLocation();
  //   const param = location.state.param;
  const [param, setParam] = useState({ ...location.state.param });
  const [member, setMember] = useState({});

  const [data, setData] = useState(null);
  let returnDate = { ...param, member_no: sessionStorage.getItem("no") };
  const getData = async () => {
    try {
      const member_no = sessionStorage.getItem("no");
      if (!member_no) {
        console.log("사용자 번호가 없습니다.");
        return;
      }
      const response = await axios.get(
        `${bootpath}/member/friend/list?member_no=${member_no}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let memberList = new Array();

  function btnProcess() {
    memberList = new Array();
    let inputList = $.find("input");
    inputList.map((e, i) => {
      // console.log($(e).attr("id"));
      if ($(e).is(":checked")) {
        memberList.push($(e).attr("id"));
      }
    });
    // setParam({ ...param, memberList: memberList });
    returnDate = { ...returnDate, memberList: memberList };
  }

  const regist = (e) => {
    axios.post(bootpath + "/fund/regist", returnDate).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">친구목록</h3>
          <div>
            {data ? (
              <ul>
                {data.map((Data) => (
                  <li key={Data.no}>
                    <input type="checkbox" id={Data.no} onChange={btnProcess} />{" "}
                    {Data.friend.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>데이터를 불러오는 중...</p>
            )}
          </div>
          <div>
            <form method="post" action="">
              <button onClick={regist}>초대하기</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeFundingInviteMember;
