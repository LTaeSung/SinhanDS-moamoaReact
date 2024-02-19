import React, { useEffect, useState } from "react";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MessageNo0 = ({ fundingMemberNo }) => {
  const { bootpath } = useContext(BootPath);
  const refuse = async (e) => {
    let param = {};
    param = { no: e.target.id };
    await axios.post(bootpath + "/funding/member/refuse", param).then((res) => {
      if (res.data === "success") {
        window.alert("성공적으로 삭제되었습니다.");
        window.location.href = "/funding/member/join";
      } else {
        console.log(res);
        window.alert("삭제 실패.");
        window.location.href = "/funding/member/join";
      }
    });
  };
  return (
    <>
      <Link
        className="btn"
        to="/funding/accept"
        state={{ no: fundingMemberNo }}
      >
        수락
      </Link>
      <button className="btn" onClick={refuse} id={fundingMemberNo}>
        거절
      </button>
    </>
  );
};

export default MessageNo0;
