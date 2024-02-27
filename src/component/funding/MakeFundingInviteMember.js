import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { useLoaderData } from "react-router-dom";
import "./MakeFundingInviteMember.css";
import CommonImagePath from "../../commonImagePath";
import RegistedImagePath from "../../registedImagePath";

function MakeFundingInviteMember({ state }) {
  const { bootpath } = useContext(BootPath);
  const location = useLocation();
  //   const param = location.state.param;
  const [param, setParam] = useState({ ...location.state.param });
  const [member, setMember] = useState({});
  const { commonImagePath } = useContext(CommonImagePath);
  const { registedImagePath } = useContext(RegistedImagePath);

  const registedFile = location.state.file;
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
        window.location.href = "/funding/AfterMakeFunding";
      });
  };

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">친구목록</h3>
          <div className="friend_lists">
            {data ? (
              <ul>
                {data.map((Data) => (
                  <li key={Data.no} className="friend_list_one">
                    {" "}
                    <div className="friend_frame">
                      <img
                        className="friend_image"
                        src={
                          Data.friend.photo != null
                            ? `${registedImagePath}${Data.friend.photo}`
                            : `${commonImagePath}header_Profile.png`
                        }
                        alt="프로필 사진"
                      />
                      <div className="friend_name">{Data.friend.name}</div>
                      <div id="invite_btns">
                        <input
                          type="checkbox"
                          id={Data.friend.no}
                          onChange={addFriend}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>데이터를 불러오는 중...</p>
            )}
          </div>
          <div>
            <button
              className={"btn"}
              style={{ marginLeft: "35px", marginTop: "50px" }}
              onClick={regist}
            >
              초대하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeFundingInviteMember;
