import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import "./boardlist.css";

function BoardHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <NavLink
          className="navbarMenu"
          to={"/board/list"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          공지사항
        </NavLink>
        <NavLink
          className="navbarMenu"
          to={"/board/qna/list"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          Q&A
        </NavLink>
      </div>
    </div>
  );
}

export default BoardHeader;
