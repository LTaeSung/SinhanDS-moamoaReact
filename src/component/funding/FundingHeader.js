import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import BootPath from "./../../BootPath";
import { useContext } from "react";
function FundingHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <NavLink
          className="fund_navbarMenu "
          to={"/funding/member/join"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          참여한 챌린지
        </NavLink>
        <NavLink
          className="fund_navbarMenu "
          to={"/funding/host"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          주최한 챌린지
        </NavLink>
        <NavLink
          className="fund_navbarMenu "
          to={"/funding/invited"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          초대받은 챌린지
        </NavLink>
        <br />
      </div>
    </div>
  );
}

export default FundingHeader;
