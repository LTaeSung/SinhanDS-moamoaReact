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

  const registedFile = location.state.file;
  console.log("file");
  console.log(registedFile);
  const [data, setData] = useState(null);
  let returnDate = {
    ...param,
    member_no: sessionStorage.getItem("no"),
    member_name: sessionStorage.getItem("name"),
  };
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

  function addFriend() {
    memberList = new Array();
    let inputList = $.find("input");
    inputList.map((e, i) => {
      if ($(e).is(":checked")) {
        memberList.push($(e).attr("id"));
      }
    });
    returnDate = { ...returnDate, memberList: memberList };
  }

  const regist = (e) => {
    const formData = new FormData();
    formData.append("file", registedFile);
    for (let k in returnDate) {
      formData.append(k, returnDate[k]);
    }
    axios
      .post(bootpath + "/fund/regist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          charset: "utf-8",
        },
      })
      .then((res) => {
        console.log(res);
        //window.location.href = "/funding/AfterMakeFunding";
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
                    <input
                      type="checkbox"
                      id={Data.friend.no}
                      onChange={addFriend}
                    />{" "}
                    {Data.friend.name}
                    <br />
                    &nbsp;&nbsp;&nbsp;
                    {Data.friend.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>데이터를 불러오는 중...</p>
            )}
          </div>
          <div>
            <button onClick={regist}>초대하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeFundingInviteMember;
