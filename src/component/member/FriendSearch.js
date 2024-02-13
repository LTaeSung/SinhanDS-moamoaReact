import React, { useState, useContext } from "react";
import axios from "axios";
import BootPath from "../../BootPath";
import MemberHeader from "./MemberHeader";

function SearchMember() {
  const [name, setName] = useState("");
  const { bootpath } = useContext(BootPath);
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
                  <li key={member.id}>{member.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        작업 선
      </div>
    </>
  );
}

export default SearchMember;
