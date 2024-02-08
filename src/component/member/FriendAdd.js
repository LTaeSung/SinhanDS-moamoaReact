import MemberHeader from "./MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";

function FriendAdd() {
  const { bootpath } = useContext(BootPath);

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const member_no = sessionStorage.getItem("no");
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
export default FriendAdd;
