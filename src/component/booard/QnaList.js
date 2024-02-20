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

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const no = sessionStorage.getItem("no");
    setWriter(name || "");
    setNo(Number(no) || "");
  }, []);

  //로그인정보
  const getApi = () => {
    console.log(param);
    axios.post(bootpath + "/member/devlogin", param).then((res) => {
      console.log(res);
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("name", res.data.name);
        setWriter(res.data.name);
        setNo(res.data.no);
      }
    });
  };

  //qna등록
  const SaveQna = async () => {
    if (
      document.querySelector("input").value == "" &&
      document.querySelector("textarea").value == ""
    ) {
      alert("제목 또는 내용을 입력해 주세요");
    }
    console.log();

    try {
      const response = await axios.post(`${bootpath}/board/add`, {
        memberno: no,
        title: newQna.title,
        contents: newQna.contents,
        writer: writer,
        boardtype: true,
      });
      setData((prevData) => [...prevData, response.data]);
      setTotalElement((prevTotal) => prevTotal + 1);

      setNewQna({ title: "", contents: "" });
    } catch (error) {
      console.log("에러 발생", error);
    }
  };

  //boardtype로 공지사항이랑 qna 구분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${bootpath}/board/list`);
        const filteredDate = response.data.filter((item) => item.boardtype);
        setData(filteredDate);
        setTotalElement(filteredDate.length);
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
            <span className="span_title">Q&A</span>
            <span>총 {totalElement} 건 </span>
            <select>
              <option value="0">전체</option>
              <option value="1">진행중</option>
              <option value="2">완료</option>
            </select>
          </div>
          <div className="문의하기">
            <span id="writer">{writer}</span>
            <br />
            <input
              type="text"
              value={newQna.title}
              placeholder="제목"
              onChange={(e) => setNewQna({ ...newQna, title: e.target.value })}
            />{" "}
            <br />
            <textarea
              value={newQna.contents}
              placeholder="내용은 255자 이하로 작성해 주세요"
              onChange={(e) =>
                setNewQna({ ...newQna, contents: e.target.value })
              }
            ></textarea>{" "}
          </div>
          <div className="btn-space">
            <button className="btn" onClick={SaveQna}>
              작성하기
            </button>{" "}
          </div>
          <br />
          <br />
          <div className="qna-list">
            <ul>
              {data.map((item) => (
                <li key={item.no}>
                  <Link to={`/board/qna/detail?no=${item.no}`}>
                    <div>{item.title}</div>
                    <p>{new Date(item.registdate).toLocaleDateString()}</p>
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
