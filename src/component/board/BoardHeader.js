import '../../App.css';
import {Link} from "react-router-dom";

function BoardHeader(){
    return(
    <div>
        <div className="headerNav">
            <Link className="navbarMenu" to={'/board/list'} >게시글</Link>
            <Link className="navbarMenu" to={'/board/reply'} >댓글</Link>
            <Link className="navbarMenu" to={'/board/edit'} >수정</Link>
        </div>
    </div>

    );
}

export default BoardHeader;