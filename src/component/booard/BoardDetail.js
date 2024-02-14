import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import BootPathContext from "./../../BootPath";
import { Link } from "react-router-dom";

function BoardDetail() {
  const bootPath = useContext(BootPathContext);
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState({
    writer: "",
    contents: "",
  });

  useEffect(() => {
    const fetchBoardReplies = async () => {
      try {
        const boardResponse = await axios.get(
          `${bootPath.bootpath}/board/list/${id}`
        );
        setBoard(boardResponse.data);

        const repliesResponse = await axios.get(
          `${bootPath.bootpath}/board/reply/list?boardno=${id}`
        );
        setReplies(repliesResponse.data.content);
      } catch (error) {
        console.error("에러가 발생했습니다.", error);
      }
    };

    fetchBoardReplies();
  }, [id, bootPath]);

  const InputChange = (e) => {
    const { name, value } = e.target;
    setNewReply((prev) => ({ ...prev, [name]: value }));
  };

  //댓글저장
  const SaveReply = async () => {
    try {
      await axios.post(`${bootPath.bootpath}/board/reply/add`, {
        ...newReply,
        boardno: id,
      });

      //댓글목록
      const repliesResponse = await axios.get(
        `${bootPath.bootpath}/board/reply/list?boardno=${id}`
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
        `${bootPath.bootpath}/board/reply/list?boardno=${id}`
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
          <h3 className="sub_title"> 공지사항 </h3>
          <br />
          <div>
            {board.no} <br />
            {board.title} <br />
            {board.writer} &nbsp;&nbsp;
            {new Date(board.registdate).toLocaleDateString()} <br />
            {board.contents} <br />
          </div>
          <br />
          <p>댓글 작성하기</p>
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

export default BoardDetail;
