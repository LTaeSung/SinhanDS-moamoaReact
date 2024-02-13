import MemberHeader from "./MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";

function Friendlist() {
  const { bootpath } = useContext(BootPath);

  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const getData = async () => {
    try {
      if (!member_no) {
        console.log("사용자 번호가 없습니다.");
        return;
      }
      const response = await axios.get(
        ` ${bootpath}/member/friend/list?member_no=${member_no}`
      );
      setData(response.data);
      console.log(response.data);
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
          <h3 className="sub_title">친구목록</h3>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li key={Data.no}>
                  친구{Data.no} , {Data.friend.email}
                  <button
                    id="delete-friend-btn"
                    onClick={() => handleDeleteFriend(Data.friend.no)}
                  >
                    친구 삭제
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>데이터를 불러오는 중...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Friendlist;
