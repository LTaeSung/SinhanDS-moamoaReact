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
        <Link className="navbarMenu" to={"/member/signup"}>
          회원가입
        </Link>
        <Link className="navbarMenu" to={"/"}>
          로그인
        </Link>
      </div>
    </div>
  );
}

export default MemberHeader;
