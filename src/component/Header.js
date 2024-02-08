import "../App.css";
import logo from "../logo.svg";

function Header() {
  const logout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("no");
    window.location.href = "/";
  };
  return (
    <div className="headerNav">
      <button onClick={logout}>
        <img src={logo} className="App-logo" alt="logo" />
      </button>

      <img src={"../img/header_bell.png"} />
      <img src={"../img/header_people-fill.png"} />
      <img src={"../img/header_Profile Avatar.png"} />
    </div>
  );
}

export default Header;
