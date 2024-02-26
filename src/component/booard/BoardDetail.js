import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import BoardHeader from "./BoardHeader";
import "./boardlist.css";

function BoardDetail() {
  const bootPath = useContext(BootPathContext);
  const [param, setParams] = useSearchParams();
  const [board, setBoard] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${bootPath.bootpath}/board/detail?no=${param.get("no")}`
        );
        setBoard(response.data);
      } catch (error) {
        console.log("에러 발생", error);
      }
    };
    fetchData();
  }, [param]);

  return (
    <>
      <BoardHeader />
      <div className="sub">
        <div className="size">
          <div className="slect">
            <p className="span_title"> 공지사항 </p>
          </div>
          <div>
            <div className="qna_title_area">
              <span id="board_detail_title">{board.title}</span> <br />
              <span id="board_detail_writer">{board.writer}</span>
              <span id="board_detail_date">
                | {new Date(board.registdate).toLocaleDateString()} 작성
              </span>
            </div>
            <div className="qna_content_area">
              <p id="board_detail_content">{board.contents}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;
