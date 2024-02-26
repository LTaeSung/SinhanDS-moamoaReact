import { Link, NavLink } from "react-router-dom";
const AdminHeader = () => {
  return (
    <>
      <div>
        <Link className="btn" to="/admin/setStatus1">
          초대 기간 만료
        </Link>
        <Link className="btn" to="/admin/setStatus2">
          펀드 기간 만료
        </Link>
        <Link className="btn" to="/admin/setStatus3">
          투표 기간 만료
        </Link>
        <Link className="btn" to="/admin/setStatus4">
          정산 기간 만료
        </Link>
        <Link className="btn" to="/admin/regularpay">
          오늘 결제 예정
        </Link>
        <Link className="btn" to="/admin/repay">
          재결제 예정
        </Link>
        <Link className="btn" to="/admin/boardnew">
          공지사항 작성
        </Link>
        <Link className="btn" to="/admin/statistics/main">
          통계
        </Link>
      </div>
    </>
  );
};

export default AdminHeader;
