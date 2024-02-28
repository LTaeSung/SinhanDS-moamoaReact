import React from "react";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MessageNo0 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  const refuse = async (e) => {
    window.confirm("펀드 초대를 거부합니다.");
    let param = {};
    param = { no: e.target.id };

    await axios.post(bootpath + "/funding/member/refuse", param).then((res) => {
      if (res.data === "success") {
        window.alert("성공적으로 삭제되었습니다.");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else {
        window.alert("삭제 실패.");
      }
    });
  };
  return (
    <>
      <div>
        <Link
          id="state_btn_left"
          to="/funding/accept"
          state={{
            fundingMemberNo: obj.fundingMemberNo,
            fundingNo: obj.fundingNo,
          }}
        >
          수락
        </Link>
        <button
          className="state_btn_right"
          onClick={refuse}
          id={obj.fundingMemberNo}
        >
          거절
        </button>
      </div>
    </>
  );
};

export default MessageNo0;
