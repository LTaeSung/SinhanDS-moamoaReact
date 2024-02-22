import React, { useContext, useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import "./boardlist.css";

function QnaList() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);
  const [param, setParam] = useState({});
  const [writer, setWriter] = useState("");
  const [no, setNo] = useState("");
  const [newQna, setNewQna] = useState({ title: "", contents: "" });
  const [showNewQna, setShowNewQna] = useState(false);

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const no = sessionStorage.getItem("no");
    setWriter(name || "");
    setNo(Number(no) || "");
  }, []);

  //로그인정보
  const getApi = () => {
    axios.post(bootpath + "/member/devlogin", param).then((res) => {
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("name", res.data.name);
        setWriter(res.data.name);
        setNo(res.data.no);
      }
    });
  };

  //qna등록
  const SaveQna = async (e) => {
    e.preventDefault();

    if (!newQna.title.trim() || !newQna.contents.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${bootpath}/board/add`, {
        memberno: no,
        title: newQna.title,
        contents: newQna.contents,
        writer: writer,
        boardtype: true,
      });
      setData((prevData) => [response.data, ...prevData]);
      setTotalElement((prevTotal) => prevTotal + 1);

      setNewQna({ title: "", contents: "" });
      setShowNewQna(false);
    } catch (error) {
      console.log("에러 발생", error);
    }
  };

  //boardtype로 공지사항이랑 qna 구분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${bootpath}/board/list/qna`);

        setData(response.data);
        setTotalElement(response.data.length);
      } catch (error) {
        console.log("error 남", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BoardHeader />
      <div className="sub">
        <div className="size">
          <div className="slect">
            <span className="span_title">자유게시판</span>
            <span>총 {totalElement} 건 </span>
          </div>
          <div className="hide">
            <span id="writer">{writer}</span>
            <button id="new_qna" onClick={() => setShowNewQna((prev) => !prev)}>
              새 글쓰기
            </button>
            <br />
            {showNewQna && (
              <div className="toggle_qna">
                <input
                  id="qna_text"
                  type="text"
                  value={newQna.title}
                  placeholder="제목"
                  onChange={(e) =>
                    setNewQna({ ...newQna, title: e.target.value })
                  }
                />{" "}
                <br />
                <textarea
                  id="qna_textarea"
                  value={newQna.contents}
                  placeholder="내용은 255자 이하로 작성해 주세요"
                  onChange={(e) =>
                    setNewQna({ ...newQna, contents: e.target.value })
                  }
                ></textarea>{" "}
                <div className="btn-space">
                  <button className="btn" onClick={SaveQna}>
                    저장하기
                  </button>{" "}
                </div>
              </div>
            )}
          </div>
          <br />
          <div className="qna-list">
            <ul>
              {data.map((item) => (
                <li key={item.no} className="liWithUnderBar">
                  <Link to={`/board/qna/detail?no=${item.no}`}>
                    <div>{item.title}</div>
                    <span>{item.writer}</span>
                    <span>
                      {new Date(item.registdate).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default QnaList;
