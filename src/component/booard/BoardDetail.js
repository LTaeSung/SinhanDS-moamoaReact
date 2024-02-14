import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import { Link } from "react-router-dom";

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
      {/* <BoardHeader /> */}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title"> 공지사항 </h3>
          <div>
            <h5>게시글 상세 페이지</h5>
            <p>no: {board.no}</p>
            <p>Title: {board.title}</p>
            <p>Writer: {board.writer}</p>
            <p>Contents: {board.contents}</p>
            <p>
              Regist Date: {new Date(board.registdate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;
