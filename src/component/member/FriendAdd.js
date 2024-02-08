import MemberHeader from "./MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";

function FriendAdd() {
  const { bootpath } = useContext(BootPath);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Axios를 사용하여 입력값을 서버로 전송
      const response = await axios.post(bootpath + "/member/friend/search", {
        term: searchTerm,
      });
      console.log(response.data); // 서버에서 받은 응답을 출력하거나 처리
    } catch (error) {
      console.error("Error searching for friends:", error);
    }
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">친구목록</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default FriendAdd;
