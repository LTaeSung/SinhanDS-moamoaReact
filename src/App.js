import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Mypage_info from "./component/member/Mypage_info";
import Login from "./component/member/Login";
import Signup from "./component/member/Signup";
import DevLogin from "./component/member/DevLogin";
import AfterSignin from "./component/member/AfterSignin";
import FundingJoinList from "./component/funding/FundingJoinList";
import MakeFunding from "./component/funding/MakeFunding";
import MakeFundingInviteMember from "./component/funding/MakeFundingInviteMember";
import AfterMakeFunding from "./component/funding/AfterMakeFunding";
import FundingHostList from "./component/funding/FundingHostList";
import FundingList from "./component/funding/FundingList";
import FundingInfo from "./component/funding/FundingInfo";
import InvitedFunding from "./component/funding/InvitedFunding";
import FriendList from "./component/member/FriendList";
import AccountList from "./component/member/payment/AccountList";
import AddAccountList from "./component/member/payment/AddAccountList";
import CardList from "./component/member/payment/CardList";
import AddCardList from "./component/member/payment/AddCardList";
import Accept from "./component/funding/Accept";
import AfterAcceptFunding from "./component/funding/AfterAcceptFunding";
import FriendSearch from "./component/member/FriendSearch";
import BoardList from "./component/booard/BoardList";
import BoardDetail from "./component/booard/BoardDetail";
import BoardNew from "./component/booard/BoardNew";
import QnaList from "./component/booard/QnaList";
import QnaDetail from "./component/booard/QnaDetail";
import MinusPoint from "./component/point/MinusPoint";
import PlusPoint from "./component/point/PlusPoint";
import PointList from "./component/point/PointList";

import ModAccountList from "./component/member/payment/ModAccountList";
import ModCardList from "./component/member/payment/ModCardList";
import ModifyCardToFund from "./component/funding/ModifyCardToFund";

import FundPointList from "./component/point/FundPointList";
import Beforesignup from "./component/member/BeforeSignup";
import RegularPayList from "./component/funding/admin/RegularPayList";
import RePayList from "./component/funding/admin/RePayList";
import DontAcceptRefuseInWeekMemberList from "./component/funding/admin/DontAcceptRefuseList";

import AlarmList from "./component/alarm/AlarmList";

import LeaveCheck from "./component/member/LeaveCheck";
import FundingDueList from "./component/funding/admin/FundingDueList";
import VoteDueList from "./component/funding/admin/VoteDueList";
import SettlementDueList from "./component/funding/admin/SettlementDueList";
import Main from "./component/Main";
import GiveupStatistics from "./component/funding/admin/GiveupStatistics";
import SuccessFailStatistics from "./component/funding/admin/SuccessFailStatistics";
import StatisticsMain from "./component/funding/admin/StatisticsMain";
import DefaultStatistics from "./component/funding/admin/DefaultStatistics";
import PersonalStatistics from "./component/funding/admin/PersonalStatistics";

function App() {
  const checkLogin = (Component) => {
    if (sessionStorage.getItem("no") != null) {
      return <Component />;
    } else {
      return <Navigate to="/login/dev" />;
    }
  };
  const checkDevLogin = (Component) => {
    if (
      sessionStorage.getItem("no") != null &&
      sessionStorage.getItem("no") === "0"
    ) {
      return <Component />;
    } else {
      return <Navigate to="/login/dev" />;
    }
  };
  return (
    <div className="App-background">
      <Header />
      <header className="App-header">
        <div className="App-container">
          <Routes>
            <Route path="/" element={<DevLogin />} />
            <Route path="/main" element={<Main />} />
            <Route path="/login/dev" element={<DevLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/after" element={<AfterSignin />} />
            <Route path="/member/info" element={checkLogin(Mypage_info)} />
            <Route path="/login/signup" element={checkLogin(Signup)} />
            <Route
              path="/login/beforeSignup"
              element={checkLogin(Beforesignup)}
            />
            <Route
              path="/member/friend/list"
              element={checkLogin(FriendList)}
            />
            <Route
              path="/member/payment/account"
              element={checkLogin(AccountList)}
            />
            <Route
              path="/member/payment/account/add"
              element={checkLogin(AddAccountList)}
            />
            <Route path="/member/payment/card" element={checkLogin(CardList)} />
            <Route
              path="/member/payment/card/add"
              element={checkLogin(AddCardList)}
            />
            <Route
              path="/member/payment/account/modify/:no"
              element={checkLogin(ModAccountList)}
            />
            <Route
              path="/member/payment/card/modify/:no"
              element={checkLogin(ModCardList)}
            />
            <Route
              path="/funding/modifycard"
              element={checkLogin(ModifyCardToFund)}
            />
            <Route
              path="/member/friend/search"
              element={checkLogin(FriendSearch)}
            />
            <Route
              path="/funding/member/join"
              element={checkLogin(FundingJoinList)}
            />
            <Route path="/funding/make" element={checkLogin(MakeFunding)} />
            <Route
              path="/funding/inviteMember"
              element={checkLogin(MakeFundingInviteMember)}
            />
            <Route
              path="/funding/AfterMakeFunding"
              element={checkLogin(AfterMakeFunding)}
            />
            <Route path="/funding/host" element={checkLogin(FundingHostList)} />
            <Route path="/funding/list" element={checkLogin(FundingList)} />
            <Route path="/funding/info" element={checkLogin(FundingInfo)} />
            <Route
              path="/funding/invited"
              element={checkLogin(InvitedFunding)}
            />
            <Route path="/funding/accept" element={checkLogin(Accept)} />
            <Route
              path="/funding/afterAcceptFunding"
              element={checkLogin(AfterAcceptFunding)}
            />
            <Route path="/board/list" element={<BoardList />} />
            <Route path="/board/detail" element={<BoardDetail />} />
            <Route path="/admin/boardnew" element={<BoardNew />} />
            <Route path="/board/qna/list" element={<QnaList />} />
            <Route path="/board/qna/detail" element={<QnaDetail />} />
            <Route path="/point/minus" element={checkLogin(MinusPoint)} />
            <Route path="/point/plus" element={checkLogin(PlusPoint)} />
            <Route path="/point/pointlist" element={checkLogin(PointList)} />
            <Route
              path="/point/fundpointlist"
              element={checkLogin(FundPointList)}
            />
            <Route
              path="/funding/regularpay"
              element={checkLogin(RegularPayList)}
            />
            <Route path="/alarm" element={checkLogin(AlarmList)} />
            <Route path="/member/leavecheck" element={checkLogin(LeaveCheck)} />
            <Route
              path="/admin/setStatus1"
              element={checkDevLogin(DontAcceptRefuseInWeekMemberList)}
            />
            <Route
              path="/admin/setStatus2"
              element={checkDevLogin(FundingDueList)}
            />
            <Route
              path="/admin/setStatus3"
              element={checkDevLogin(VoteDueList)}
            />
            <Route
              path="/admin/setStatus4"
              element={checkDevLogin(SettlementDueList)}
            />
            <Route
              path="/admin/regularpay"
              element={checkDevLogin(RegularPayList)}
            />
            <Route path="/admin/repay" element={checkDevLogin(RePayList)} />
            <Route path="/statistics/giveup" element={<GiveupStatistics />} />
            <Route
              path="/statistics/successfail"
              element={<SuccessFailStatistics />}
            />
            <Route path="/statistics/default" element={<DefaultStatistics />} />
            <Route path="/statistics/main" element={<StatisticsMain />} />
            <Route
              path="/statistics/personal"
              element={<PersonalStatistics />}
            />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
