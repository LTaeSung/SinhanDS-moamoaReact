import "../../App.css";
import { Link } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function BoardHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <Link className="navbarMenu" to={"/board/list"}>
          공지사항
        </Link>
        <Link className="navbarMenu" to={"/board/qna/list"}>
          Q&A
        </Link>
      </div>
    </div>
  );
}

export default BoardHeader;
