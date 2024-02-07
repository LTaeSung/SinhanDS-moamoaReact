import '../App.css';
import logo from '../logo.svg';

function Header(){
    return(
        <div className="headerNav">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={'../img/header_bell.png'}  />
            <img src={'../img/header_people-fill.png'} />
            <img src={'../img/header_Profile Avatar.png'} />
        </div>
    );
}

export default Header;