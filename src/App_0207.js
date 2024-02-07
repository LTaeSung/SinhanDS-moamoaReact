import { Routes, Route } from "react-router-dom";
import './App.css';
import BoardList from "./component/board/BoardList";
import Regist from "./component/board/Regist";
import View from "./component/board/View";
import Edit from "./component/board/Edit";
import Reply from "./component/board/Reply";
import Header from "./component/Header";
import Member from "./component/member/Member";
import MemberHeader from "./component/member/MemberHeader";

function App() {
  return (
      <div className="App-background">
          <Header/>
          <MemberHeader/>
      <header className="App-header">
          <container className="App-container">
            <Routes>
                <Route path="/member" element={<Member />} />
                <Route path="/board/list" element={<BoardList />} />
                <Route path="/board/regist" element={<Regist />} />
                <Route path="/board/view" element={<View />} />
                <Route path="/board/edit" element={<Edit />} />
                <Route path="/board/reply" element={<Reply />} />
            </Routes>
          </container>
      </header>
      </div>
  );
}

export default App;
