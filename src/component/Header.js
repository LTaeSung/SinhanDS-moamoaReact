import "../App.css";
import logo from "../moamoalogo.png";
import $ from "jquery";
function Header() {
  const goToLink = (e) => {
    window.location.href = $(e.target).attr("target");
  };
  return (
    <div className="main_headerNav">
      <button onClick={goToLink} target="/main">
        <img src={logo} className="App-logo" alt="logo" />
      </button>
      <img
        className="header-logo"
        src={"/img/header_bell.png"}
        onClick={goToLink}
        target="/alarm"
        alt="bell"
      />
      <img
        className="header-logo "
        src={"/img/header_challenge.png"}
        onClick={goToLink}
        target="/funding/member/join"
        alt="challenge"
      />
      <img
        className="header-logo "
        src={"/img/header_Profile.png"}
        onClick={goToLink}
        target="/member/info"
        alt="profile"
      />{" "}
    </div>
  );
}

export default Header;
