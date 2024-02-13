import "../../App.css";
import { Link } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function MemberHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <Link className="navbarMenu" to={"/member/info"}>
          회원정보
        </Link>
        <Link className="navbarMenu" to={"/member/friend/list"}>
          친구 목록
        </Link>
        <Link className="navbarMenu" to={"/member/friend/search"}>
          친구 신청
        </Link>
      </div>
    </div>
  );
}

export default MemberHeader;
