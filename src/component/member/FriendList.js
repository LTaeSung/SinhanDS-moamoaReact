import MemberHeader from "./MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";

function FriendList() {
  const [name, nameSearch] = useState("");
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleInputChange = (event) => {
    nameSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberNo = sessionStorage.getItem("memberNo"); // sessionStorage에서 멤버 번호 가져오기
        const response = await axios.get(
          bootpath + `member/friend/list?member_no=${memberNo}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching friend list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">친구목록</h3>
          <div>
            {loading ? (
              <p>데이터를 불러오는 중...</p>
            ) : (
              <ul>
                {data &&
                  data.map((item) => (
                    <li key={item.no}>{item.friend.email}</li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default FriendList;
