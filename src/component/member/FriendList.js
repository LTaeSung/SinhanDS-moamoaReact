import MemberHeader from "./MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";

function Frindlist() {
  const { bootpath } = useContext(BootPath);

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        bootpath + "/member/friend/list?member_no=2"
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
export default Frindlist;
