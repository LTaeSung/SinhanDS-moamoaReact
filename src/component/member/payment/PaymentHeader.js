import '../../App.css';
import {Link} from "react-router-dom";

function PaymentHeader(){
    return(
        <div>
            <div className="headerNav">
                <Link className="navbarMenu" to={'/member/info/card'} >카드등록</Link>
                <Link className="navbarMenu" to={'/member/info/account'} >계좌등록</Link>
            </div>
        </div>

    );
}

export default PaymentHeader;