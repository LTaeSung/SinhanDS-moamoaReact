import { Link, NavLink } from "react-router-dom";
import "./Admin.css";
const AdminHeader = () => {
  return (
    <>
      <div className="buttonGroup">
        <Link className="adminbtn_black" to="/admin/setStatus1">
          초대 기간 만료
        </Link>
        <Link className="adminbtn_black" to="/admin/setStatus2">
          챌린지 기간 만료
        </Link>
        <Link className="adminbtn_black" to="/admin/setStatus3">
          투표 기간 만료
        </Link>
        <Link className="adminbtn_black" to="/admin/setStatus4">
          정산 기간 만료
        </Link>
        <Link className="adminbtn_black" to="/admin/regularpay">
          오늘 정기 결제
        </Link>
        <Link className="adminbtn_black" to="/admin/repay">
          재결제 예정자
        </Link>
        <Link className="adminbtn" to="/admin/boardnew">
          공지사항 작성
        </Link>
        <Link className="adminbtn" to="/admin/statistics/main">
          전체 통계 확인
        </Link>
      </div>
    </>
  );
};

export default AdminHeader;
