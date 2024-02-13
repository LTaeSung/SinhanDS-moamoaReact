import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import BootPathContext from "./../../BootPath";
import { Link } from "react-router-dom";

function BoardDetail() {
  const bootPath = useContext(BootPathContext);
  const { id } = useParams();
  const [board, setBoard] = useState({});

  useEffect(() => {
    const fetchboard = async () => {
      try {
        const response = await axios.get(
          `${bootPath.bootpath}/board/list/${id}`
        );
        setBoard(response.data);
      } catch (error) {
        console.error("에러있어요", error);
      }
    };
    fetchboard();
  }, [id, bootPath]);

  return (
    <>
      {/* <BoardHeader /> */}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title"> 공지사항 </h3>
          <br />
          <div>
            {board.no} <br />
            {board.title} <br />
            {board.writer} <br />
            {board.contents} <br />
            {board.registdate} <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;
