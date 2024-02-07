import '../../App.css';
import {Link} from "react-router-dom";

function FundingHeader(){
    return(
        <div>
            <div className="headerNav">
                <Link className="navbarMenu" to={'/member/info'} >회원정보</Link>
                <Link className="navbarMenu" to={'/funding/host'} >주최한 펀딩</Link>
                <Link className="navbarMenu" to={'/funding/join'} >참여한 펀딩</Link>
            </div>
        </div>

    );
}

export default FundingHeader;