import React, { useState, useContext } from "react";
import axios from "axios";
import BootPath from "../../BootPath";
import MemberHeader from "./MemberHeader";

function SearchMember() {
  const [email, setEmail] = useState("");
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const [memberList, setMemberList] = useState([]);
  const [error, setError] = useState(null);
  const handleSearch = () => {
    axios
      .get(bootpath + "/member/friend/search", {
        params: { member_no: member_no, email: email }, // member_no를 적절한 값으로 변경
      })
      .then((response) => {
        const data = response.data;
        if (!data || data.length === 0) {
          alert("이미 친구로 등록되어있거나 정보가 없습니다.");
        }
        console.log(response.data);
        setMemberList(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error searching members:", error);
        setMemberList([]);
        setError("오류가 발생했습니다. 잠시후 다시 시도 하십시오.");
      });
  };

  const handleAddFriend = (friendNo, member) => {
    if (member.no === friendNo) {
      alert("자기 자신을 친구 추가할 수 없습니다.");
      return;
    }
    axios
      .get(
        `${bootpath}/member/friend/input?member_no=${member.no}&friend_no=${friendNo}`
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
          <h3 className="sub_title">유저 검색</h3>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ID로 검색"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <div>
              <ul>
                {memberList.map((member) => (
                  <li key={member.no}>
                    이름 : {member.name} , 멤버 이메일: {member.email}
                    <button
                      id="Add-friend-btn"
                      onClick={() => handleAddFriend(member.no, member)}
                    >
                      친구 등록
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          ----------------------------- 작업선
        </div>
      </div>
    </>
  );
}

export default SearchMember;
