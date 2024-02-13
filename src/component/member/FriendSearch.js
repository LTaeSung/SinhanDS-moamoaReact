import React, { useState, useContext } from "react";
import axios from "axios";
import BootPath from "../../BootPath";
import MemberHeader from "./MemberHeader";

function SearchMember() {
  const [name, setName] = useState("");
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const [memberList, setMemberList] = useState([]);
  const [error, setError] = useState(null);

  const getMember = () => {
    axios
      .get(bootpath + "/member/friend/search", {
        params: { name: name },
      })
      .then((res) => {
        console.log(res.data);
        setMemberList(res.data);
      });
  };

  const handleAddFriend = (friendNo) => {
    axios
      .get(
        `${bootpath}/member/friend/input?member_no=${member_no}&friend_no=${friendNo}`
      )
      .then(() => {
        alert("친구가 추가되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.log("친구 추가 중 오류 발생", error);
      });
  };
  return (
    <>
      <MemberHeader />

      <div className="sub">
        <div className="size">
          <h3 className="sub_title">유저검색</h3>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by name"
            />
            <button onClick={getMember}>Search</button>
            {error && <p>{error}</p>}
            <div>
              <ul>
                {memberList.map((member) => (
                  <li key={member.no}>
                    이름 : {member.name} , 멤버 번호: {member.email}
                    <button
                      id="Add-friend-btn"
                      onClick={() => handleAddFriend(member.no)}
                    >
                      친구 등록
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          --------------------------------- 작업 선
        </div>
      </div>
    </>
  );
}

export default SearchMember;
