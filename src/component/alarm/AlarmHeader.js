import '../../App.css';
import {Link} from "react-router-dom";

function AlarmHeader(){
    return(
    <div>
        <div className="headerNav">
            <Link className="navbarMenu" to={'/member/info'} >회원정보</Link>
            <Link className="navbarMenu" to={'/member/login/naver'} >회원가입</Link>
            <Link className="navbarMenu" to={'/member/login'} >로그인</Link>
        </div>
    </div>

    );
}

export default AlarmHeader;