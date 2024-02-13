import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Mypage_info from "./component/member/Mypage_info";
import Login from "./component/member/Login";
import Signup from "./component/member/Signup";
import DevLogin from "./component/member/DevLogin";
import AfterSignin from "./component/member/AfterSignin";
import JoinFunding from "./component/funding/JoinFunding";
import MakeFunding from "./component/funding/MakeFunding";
import MakeFundingInviteMember from "./component/funding/MakeFundingInviteMember";
import FundingList from "./component/funding/FundingList";
import FriendList from "./component/member/FriendList";
import FriendSearch from "./component/member/FriendSearch";

function App() {
  return (
    <div className="App-background">
      <h1>메인 페이지(root)</h1>
      <Header />
      <header className="App-header">
        <container className="App-container">
          <Routes>
            <Route path="/" element={<DevLogin />} />

            <Route path="/login" element={<Login />} />
            <Route path="/login/after" element={<AfterSignin />} />

            <Route path="/member/info" element={<Mypage_info />} />
            <Route path="/member/signup" element={<Signup />} />

            <Route path="/member/friend/list" element={<FriendList />} />
            <Route path="/member/friend/search" element={<FriendSearch />} />

            <Route path="/funding/join" element={<JoinFunding />} />
            <Route path="/funding/make" element={<MakeFunding />} />
            <Route
              path="/funding/inviteMember"
              element={<MakeFundingInviteMember />}
            />
            <Route path="/funding/list" element={<FundingList />} />
          </Routes>
        </container>
      </header>
    </div>
  );
}

export default App;
