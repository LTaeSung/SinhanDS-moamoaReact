import MemberHeader from "./MemberHeader";
import React from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function Frindlist() {
  const { bootpath } = useContext(BootPath);
  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">친구목록</h3>
          {/*테스트 서버*/}
        </div>
      </div>
    </>
  );
}
export default Frindlist;
