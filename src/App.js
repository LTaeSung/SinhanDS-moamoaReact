import { Routes, Route } from "react-router-dom";
import './App.css';
import BoardList from "./component/board/BoardList";
import Regist from "./component/board/Regist";
import View from "./component/board/View";
import Edit from "./component/board/Edit";
import Reply from "./component/board/Reply";
import Header from "./component/Header";
import Mypage_info from "./component/member/Mypage_info";
import Signup from "./component/member/Signup";
import Signin from "./component/member/Signin";
import JoinFunding from "./component/funding/JoinFunding";
import HostFunding from "./component/funding/HostFunding";
import FundingList from "./component/funding/FundingList";
import Frindlist from "./component/member/Frindlist";

function App() {
  return (
      <div className="App-background">
          <h1>메인 페이지(root)</h1>
          <Header/>
      <header className="App-header">
          <container className="App-container">
            <Routes>
                <Route path="/member/info" element={<Mypage_info />} />
                <Route path="/" element={<Signup />} />
                <Route path="/member/frind" element={<Frindlist />} />
                <Route path="/member/login/naver" element={<Signin />} />
                <Route path="/board/list" element={<BoardList />} />
                <Route path="/board/regist" element={<Regist />} />
                <Route path="/board/view" element={<View />} />
                <Route path="/board/edit" element={<Edit />} />
                <Route path="/board/reply" element={<Reply />} />
                <Route path="/funding/join" element={<JoinFunding />} />
                <Route path="/funding/host" element={<HostFunding />} />
                <Route path="/funding/list" element={<FundingList />} />
            </Routes>
          </container>
      </header>
      </div>
  );
}

export default App;
