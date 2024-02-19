import "../App.css";
import $ from "jquery";
import "./Header.css";
function Header() {
  const logout = (e) => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("no");
    sessionStorage.removeItem("name");
    goToLink(e);
  };

  const goToLink = (e) => {
    console.log(e.target);
    window.location.href = $(e.target).attr("target");
  };
  return (
    <div className="headerNav">
      <div className="site_Icon_container">사이트 로고 올리면 될 듯</div>
      <div className="icon_container">
        <img
          className="icon"
          src={"/img/header_bell.png"}
          onClick={goToLink}
          target="/alarm"
          alt="bell"
        />
        <img
          className="icon"
          src={"/img/header_challenge.png"}
          onClick={goToLink}
          target="/funding/member/join"
          alt="challenge"
        />
        <img
          className="icon"
          src={"/img/header_Profile.png"}
          onClick={goToLink}
          target="/member/info"
          alt="profile"
        />
      </div>
    </div>
  );
}

export default Header;
