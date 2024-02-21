import "../../../App.css";
import { Link, NavLink } from "react-router-dom";
import BootPath from "./../../../BootPath";
import { useContext } from "react";
function PaymentHeader() {
  const { bootpath } = useContext(BootPath);
  return (
    <div>
      <div className="headerNav">
        <NavLink
          className="navbarMenu"
          to={"/member/info/card"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          카드등록
        </NavLink>
        <NavLink
          className="navbarMenu"
          to={"/member/info/account"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#ff4742" : {},
              fontWeight: isActive ? 700 : {},
            };
          }}
        >
          계좌등록
        </NavLink>
      </div>
    </div>
  );
}

export default PaymentHeader;
