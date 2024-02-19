import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import "../../MemberHeader.css";

function MemberHeader() {
  const { bootpath } = useContext(BootPath);

  const active = {
    color: "red",
    fontWeight: 700,
  };

  return (
    <div>
      <div className="headerNav">
        <NavLink
          className="navbarMenu"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
          to={"/member/info"}
        >
          회원정보
        </NavLink>

        <NavLink
          className="navbarMenu"
          to={"/member/friend/list"}
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          친구 목록
        </NavLink>

        <NavLink
          className="navbarMenu"
          to={"/member/friend/search"}
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          친구 신청
        </NavLink>
      </div>
    </div>
  );
}

export default MemberHeader;
