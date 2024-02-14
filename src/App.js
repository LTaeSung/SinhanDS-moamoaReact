import { Routes, Route } from "react-router-dom";
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
import QnaList from "./component/booard/QnaList";
import QnaDetail from "./component/booard/QnaDetail";
import MinusPoint from "./component/point/MiusPoint";
import PlusPoint from "./component/point/PlusPoint";
import PointList from "./component/point/PointList";

import ModAccountList from "./component/member/payment/ModAccountList";
import ModCardList from "./component/member/payment/ModCardList";

import FundPointList from "./component/point/FundPointList";
import RegularPayList from "./component/funding/RegularPayList";
import Beforesignup from "./component/member/BeforeSignup";

function App() {
  return (
    <div className="App-background">
      <h1>메인 페이지(root)</h1>
      <Header />
      <header className="App-header">
        <div className="App-container">
          <Routes>
            <Route path="/" element={<DevLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/after" element={<AfterSignin />} />
            <Route path="/member/info" element={<Mypage_info />} />
            <Route path="/member/signup" element={<Signup />} />
            <Route path="/login/beforeSignup" element={<Beforesignup />} />
            <Route path="/member/friend/list" element={<FriendList />} />
            <Route path="/member/payment/account" element={<AccountList />} />
            <Route
              path="/member/payment/account/add"
              element={<AddAccountList />}
            />
            <Route path="/member/payment/card" element={<CardList />} />
            <Route path="/member/payment/card/add" element={<AddCardList />} />
            <Route
              path="/member/payment/account/modify/:no"
              element={<ModAccountList />}
            />
            <Route
              path="/member/payment/card/modify/:no"
              element={<ModCardList />}
            />
            <Route path="/member/friend/search" element={<FriendSearch />} />
            <Route path="/funding/member/join" element={<FundingJoinList />} />
            <Route path="/funding/make" element={<MakeFunding />} />
            <Route
              path="/funding/inviteMember"
              element={<MakeFundingInviteMember />}
            />{" "}
            <Route
              path="/funding/AfterMakeFunding"
              element={<AfterMakeFunding />}
            />
            <Route path="/funding/host" element={<FundingHostList />} />
            <Route path="/funding/list" element={<FundingList />} />
            <Route path="/funding/info" element={<FundingInfo />} />
            <Route path="/funding/invited" element={<InvitedFunding />} />
            <Route path="/funding/accept" element={<Accept />} />
            <Route
              path="/funding/afterAcceptFunding"
              element={<AfterAcceptFunding />}
            />
            <Route path="/board/list" element={<BoardList />} />
            <Route path="/board/detail" element={<BoardDetail />} />
            <Route path="/board/qna/list" element={<QnaList />} />
            <Route path="/board/qna/detail" element={<QnaDetail />} />
            <Route path="/point/minus" element={<MinusPoint />} />
            <Route path="/point/plus" element={<PlusPoint />} />
            <Route path="/point/pointlist" element={<PointList />} />
            <Route path="/point/fundpointlist" element={<FundPointList />} />
            <Route path="/funding/regularpay" element={<RegularPayList />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
