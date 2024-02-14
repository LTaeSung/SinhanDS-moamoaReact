import "../../App.css";
import { Link } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function FundingHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <Link className="navbarMenu" to={"/funding/join"}>
          참여한 펀딩
        </Link>
        <Link className="navbarMenu" to={"/funding/host"}>
          주최한 펀딩
        </Link>
        <Link className="navbarMenu" to={"/funding/invited"}>
          초대받은 펀딩
        </Link>
        <br />
        <Link className="navbarMenu" to={"/funding/make"}>
          펀드 만들기
        </Link>
      </div>
    </div>
  );
}

export default FundingHeader;
