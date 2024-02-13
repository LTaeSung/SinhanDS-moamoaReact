import React, { useState, useContext } from "react";
import axios from "axios";
import BootPath from "../../BootPath";

function SearchMember() {
  const [name, setName] = useState("");
  const { bootpath } = useContext(BootPath);
  const [memberList, setMemberList] = useState([]);
  const [error, setError] = useState(null);

  //let searchName = useRef(null);

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
        <h2>Search Results:</h2>
        <ul>
          {memberList.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchMember;
