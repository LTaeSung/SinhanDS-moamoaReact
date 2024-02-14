import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import { Link } from "react-router-dom";

function QnaDetail() {
  const bootPath = useContext(BootPathContext);
  const [param, setParams] = useSearchParams();
  const [board, setBoard] = useState({});
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState({
    writer: "",
    contents: "",
  });

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

  const InputChange = (e) => {
    const { name, value } = e.target;
    setNewReply((prev) => ({ ...prev, [name]: value }));
  };

  //댓글저장
  const SaveReply = async () => {
    try {
      await axios.post(`${bootPath.bootpath}/board/reply/add`, {
        ...newReply,
        boardno: param.get("no"),
      });

      //댓글목록
      const repliesResponse = await axios.get(
        `${bootPath.bootpath}/board/reply/list?boardno=${param.get("no")}`
      );
      setReplies(repliesResponse.data.content);

      setNewReply({
        writer: "",
        contents: "",
      });
    } catch (error) {
      console.error("댓글 저장 중 에러가 발생했습니다.", error);
    }
  };

  //댓글수정
  const EditReply = async (replyId) => {};

  //댓글삭제
  const DeleteReply = async (replyId) => {
    try {
      await axios.delete(`${bootPath.bootpath}/board/reply/delete`, {
        params: {
          no: replyId,
        },
      });

      const repliesResponse = await axios.get(
        `${bootPath.bootpath}/board/reply/list?boardno=${param.get("no")}`
      );
      setReplies(repliesResponse.data.content);
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <>
      {/* <BoardHeader /> */}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title"> QNA </h3>

          <div>
            <h5>QNA 상세 페이지</h5>
            <p>no: {board.no}</p>
            <p>Title: {board.title}</p>
            <p>Writer: {board.writer}</p>
            <p>Contents: {board.contents}</p>
            <p>
              Regist Date: {new Date(board.registdate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <button>qna 수정</button> <br />
            <button>qna 삭제</button>
          </div>
          <br />
          <h5>댓글 작성하기</h5>
          <div>
            <input
              type="text"
              name="writer"
              placeholder="writer"
              value={newReply.writer}
              onChange={InputChange}
            ></input>
          </div>
          <div>
            <textarea
              name="contents"
              placeholder="content"
              value={newReply.contents}
              onChange={InputChange}
            ></textarea>
          </div>
          <button onClick={SaveReply}>저장하기</button>
          <br />
          <h5>댓글목록</h5>
          <ul>
            {replies.map((reply) => (
              <li key={reply.no}>
                {reply.writer} -
                {new Date(board.registdate).toLocaleDateString()} <br />
                {reply.contents}
                <button onClick={() => EditReply(reply.no)}>수정</button>
                <button onClick={() => DeleteReply(reply.no)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default QnaDetail;
