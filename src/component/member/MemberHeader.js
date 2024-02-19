import "../../App.css";
import { Link } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import "../../MemberHeader.css";
function MemberHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <button className="Menu_button">
          <Link to={"/member/info"}>회원 정보</Link>
        </button>

        <button className="Menu_button">
          <Link to={"/member/friend/list"}>친구 목록</Link>
        </button>

        <button className="Menu_button">
          <Link to={"/member/friend/search"}>친구 신청</Link>
        </button>
      </div>
    </div>
  );
}

export default MemberHeader;
