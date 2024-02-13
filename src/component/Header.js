import "../App.css";
import logo from "../logo.svg";
import $ from "jquery";
function Header() {
  const goToLink = (e) => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("no");
    console.log(e.target);
    window.location.href = $(e.target).attr("target");
  };
  return (
    <div className="headerNav">
      <button onClick={goToLink} target="/">
        <img src={logo} className="App-logo" alt="logo" />
      </button>

      <img
        src={"/img/header_bell.png"}
        onClick={goToLink}
        target="/알람페이지"
        alt="bell"
      />
      <img
        src={"/img/header_challenge.png"}
        onClick={goToLink}
        target="/funding/join"
        alt="challenge"
      />
      <img
        src={"/img/header_Profile.png"}
        onClick={goToLink}
        target="/member/info"
        alt="profile"
      />
    </div>
  );
}

export default Header;
