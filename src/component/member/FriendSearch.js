import React, { useState, useContext } from "react";
import axios from "axios";
import BootPath from "../../BootPath";
import MemberHeader from "./MemberHeader";
import RegistedImagePath from "../../registedImagePath";
import "./FriendSearch.css";
import CommonImagePath from "../../commonImagePath";

function SearchMember() {
  const [email, setEmail] = useState("");
  const { bootpath } = useContext(BootPath);
  const { registedImagePath } = useContext(RegistedImagePath);
  const member_no = sessionStorage.getItem("no");
  const [memberList, setMemberList] = useState([]);
  const [error, setError] = useState(null);
  const { commonImagePath } = useContext(CommonImagePath);

  const handleSearch = () => {
    if (email === null || email.replaceAll(" ", "") === "") {
      alert("검색할 수 없는 값입니다.");
      return;
    }

    axios
      .get(bootpath + "/member/friend/search", {
        params: { member_no: member_no, email: email },
      })
      .then((response) => {
        const data = response.data;
        if (!data || data.length === 0) {
          alert("이미 친구로 등록되어있거나 정보가 없습니다.");
          setMemberList([]);
        } else {
          setMemberList(response.data);
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Error searching members:", error);
        setMemberList([]);
        setError("오류가 발생했습니다. 잠시후 다시 시도 하십시오.");
      });
  };

  const handleAddFriend = (member_no, memberList) => {
    const currentUserNo = sessionStorage.getItem("no");
    if (parseInt(currentUserNo) === memberList.no) {
      alert("자기 자신을 친구 추가할 수 없습니다.");
      return;
    } else {
      axios
        .get(
          `${bootpath}/member/friend/input?member_no=${currentUserNo}&friend_no=${memberList.no}`
        )
        .then(() => {
          alert("친구가 추가되었습니다.");
          window.location.reload();
        })
        .catch((error) => {
          console.log("친구 추가 중 오류 발생", error);
        });
    }
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title" />
          <div className="space_container"></div>
          <div>
            <input
              type="text"
              className="user_search"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ID로 검색"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button className="search_button" onClick={handleSearch}>
              Search
            </button>
          </div>
          {error && <p>{error}</p>}
          <div>
            <div className="search_space_container"></div>
            {memberList.length > 0 ? (
              <ul>
                {memberList.map((member) => (
                  <li key={member.no}>
                    <div className="user_searched_container">
                      <div className="photo_range">
                        <div className="user_frame">
                          <img
                            className="user_image"
                            src={
                              member.photo ||
                              `${registedImagePath}header_Profile.png`
                            }
                            alt="프로필 사진"
                          />
                        </div>
                      </div>

                      <div className="nameEmail">
                        {member.name} <br />
                        {member.email.split("@")[0]}
                      </div>

                      <button
                        className="friend_Add"
                        id="Add-friend-btn"
                        onClick={() => handleAddFriend(member_no, member)}
                      >
                        친구 등록
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <div className="space_container"></div>
                <img
                  className="glass_icon"
                  src={`${commonImagePath}Magnifying_glass_icon.png`}
                  alt="돋보기"
                />
                <div className="space_container"></div>
                <div className="no_friend">친구를 추가해보세요</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchMember;
