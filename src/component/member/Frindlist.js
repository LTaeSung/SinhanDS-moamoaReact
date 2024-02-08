import MemberHeader from "./MemberHeader";
import React, { useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
import ReactTable from "react-table";
function Frindlist() {
  const { bootpath } = useContext(BootPath);

  const [data, setData] = useState(null);
  const getData = async () => {
    axios
      .get(bootpath + "/member/friend/list?member_no=2")
      .then((res) => {
        setData(res.data);
        console.log("성공");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">친구목록</h3>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
export default Frindlist;
