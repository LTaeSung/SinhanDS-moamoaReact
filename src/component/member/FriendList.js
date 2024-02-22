import MemberHeader from "./MemberHeader";
import React, { useEffect, useState, useContext } from "react";
import BootPath from "../../BootPath";
import axios from "axios";
import { Link } from "react-router-dom";
import CommonImagePath from "../../commonImagePath";

import RegistedImagePath from "../../registedImagePath";
import "./FriendList.css";
function Friendlist() {
  const { bootpath } = useContext(BootPath);
  const { commonImagePath } = useContext(CommonImagePath);

  const { registedImagePath } = useContext(RegistedImagePath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const getData = async () => {
    try {
      if (!member_no) {
        console.log("사용자 번호가 없습니다.");
        return;
      }
      const response = await axios.get(
        `${bootpath}/member/friend/list?member_no=${member_no}`
      );
      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDeleteFriend = (friendNo) => {
    // 친구 삭제 처리
    axios
      .get(
        `${bootpath}/member/friend/delete?member_no=${member_no}&friend_no=${friendNo}`
      )
      .then(() => {
        // 삭제에 성공한 경우, 친구 목록을 업데이트합니다.
        alert("친구가 삭제되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("친구 삭제 중 오류 발생:", error);
      });
  };
  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title" />
          <div className="space_container"></div>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li key={Data.no}>
                  <div className="friend_list_container">
                    <div className="photo_range">
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
                      </div>
                    </div>

                    <div className="name_font">{Data.friend.name}</div>

                    <div className="button_area">
                      <button
                        className="friend_delete"
                        id="delete-friend-btn"
                        onClick={() => handleDeleteFriend(Data.friend.no)}
                      >
                        친구 삭제
                      </button>
                    </div>
                  </div>
                  <hr id="final_line"></hr>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="space_container"></div>
              <img
                className="glass_icon"
                src={`${commonImagePath}Magnifying_glass_icon.png`}
                alt="돋보기"
              />
              <div className="space_container"></div>
              <div className="no_friend">
                친구가 없습니다
                <br /> 친구를 추가해보세요
              </div>
              <Link to="/member/friend/search">
                <button className="go_add_friend">친구 찾기</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Friendlist;
