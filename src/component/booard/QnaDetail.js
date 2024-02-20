import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import "./boardlist.css";

function QnaDetail() {
  const bootPath = useContext(BootPathContext);
  const [param, setParams] = useSearchParams();
  const [no, setNo] = useState("");
  const [board, setBoard] = useState({});
  const [replies, setReplies] = useState([]);
  const [writer, setWriter] = useState("");
  const [editing, setEditing] = useState(false);
  const [newReply, setNewReply] = useState({
    writer: "",
    contents: "",
  });
  const writerInput = useRef();
  const contentInput = useRef();

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    setWriter(name || "");
  }, []);

  //로그인정보
  const getApi = () => {
    console.log(param);
    axios.post(bootPath + "/member/devlogin", param).then((res) => {
      console.log(res);
      if (res.data.result === "success") {
        sessionStorage.setItem("no", res.data.no);
        sessionStorage.setItem("name", res.data.name);
        setWriter(res.data.name);
        setNo(res.data.no);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${bootPath.bootpath}/board/detail?no=${param.get("no")}`
        );
        setBoard(response.data);

        //댓글목록
        const repliesResponse = await axios.get(
          `${bootPath.bootpath}/board/reply/list?boardno=${param.get("no")}`
        );
        setReplies(repliesResponse.data.content);
      } catch (error) {
        console.log("에러 발생", error);
      }
    };
    fetchData();
  }, [param]);

  //qan수정
  const qnaInputChange = (e) => {
    const { name, value } = e.target;

    setBoard((prev) => ({ ...prev, [name]: value }));
  };

  const EditClick = () => {
    if (writer === board.writer) {
      setEditing(true);
    } else {
      alert("작성자가 아닙니다.");
    }
  };

  const savaEdit = async () => {
    if (board.writer.length < 1) {
      writerInput.current.focus();
      //focus
      return;
    }
    if (board.contents.length < 2) {
      contentInput.current.focus();
      //focus
      return;
    }

    try {
      const response = await axios.put(
        `${bootPath.bootpath}/board/update?no=${param.get("no")}`,
        {
          title: board.title,
          contents: board.contents,
        }
      );
      setEditing(false);

      const updatedData = await axios.get(
        `${bootPath.bootpath}/board/detail?no=${param.get("no")}`
      );
      setBoard(updatedData.data);
    } catch (error) {
      console.log("qna 수정하다가 오류가 났습니다.", error);
    }
  };

  const navigate = useNavigate();
  //qna삭제
  const DeleteQna = async () => {
    if (writer === board.writer) {
      try {
        await axios.delete(
          `${bootPath.bootpath}/board/delete?no=${param.get("no")}`
        );

        navigate(`/board/qna/list`);

        console.log("QnA가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("QnA 삭제 중 에러가 발생했습니다.", error);
      }
    } else {
      alert("작성자가 아닙니다.");
    }
  };

  //댓글저장
  const SaveReply = async () => {
    try {
      await axios.post(`${bootPath.bootpath}/board/reply/add`, {
        ...newReply,
        contents: newReply.contents,
        writer: writer,
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
  const InputChange = (e) => {
    const { name, value } = e.target.value;
    setNewReply((prev) => ({ ...prev, [name]: value }));
  };

  const EditReply = async (replyId) => {
    const replyIdx = replies.findIndex((reply) => reply.no === replyId);

    if (writer === replies[replyIdx].writer) {
      const updatedReplies = [...replies];
      updatedReplies[replyIdx] = {
        ...updatedReplies[replyIdx],
        editing: true,
      };

      setReplies(updatedReplies);
    } else {
      alert("작성자가 아닙니다.");
    }
  };

  const SaveEditedReply = async (replyId, replyIdx) => {
    try {
      const updatedReplies = [...replies];
      const editedReply = updatedReplies[replyIdx];

      await axios.put(`${bootPath.bootpath}/board/reply/update?no=${replyId}`, {
        contents: editedReply.contents,
      });
      updatedReplies[replyIdx] = {
        ...updatedReplies[replyIdx],
        editing: false,
      };
      setReplies(updatedReplies);
    } catch (error) {
      console.log("댓글 수정하는데 오류 남", error);
    }
  };

  //댓글삭제
  const DeleteReply = async (replyId) => {
    const replyIdx = replies.findIndex((reply) => reply.no === replyId);
    if (writer === replies[replyIdx].writer) {
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
    } else {
      alert("작성자가 아닙니다.");
    }
  };

  return (
    <>
      <BoardHeader />
      <div className="sub">
        <div className="size">
          <div className="slect_detail">
            <h3 className="span_title_detail"> QNA </h3>
          </div>
          <div>
            <div>
              {editing ? (
                <>
                  <span id="qna_writer">{board.writer}</span>
                  <p id="qna_time">
                    {new Date(board.registdate).toLocaleDateString()}
                  </p>
                  <span>
                    <input
                      id="qna_edit_title"
                      ref={writerInput}
                      type="text"
                      value={board.title}
                      onChange={qnaInputChange}
                    />{" "}
                  </span>
                  <p>
                    <textarea
                      id="qna_content"
                      ref={contentInput}
                      value={board.contents}
                      onChange={qnaInputChange}
                      name="contents"
                    ></textarea>
                  </p>
                  <button className="qna_detail_btn" onClick={savaEdit}>
                    저장하기
                  </button>
                </>
              ) : (
                <>
                  <p id="qna_writer">{board.writer}</p>
                  <p id="qna_time">
                    {new Date(board.registdate).toLocaleDateString()}
                  </p>
                  <span id="qna_title">{board.title}</span>
                  <div className="qna_content_area">
                    <p id="qna_content">{board.contents}</p>
                  </div>

                  <button className="qna_detail_btn" onClick={EditClick}>
                    수정하기
                  </button>
                </>
              )}
            </div>
            <button className="qna_detail_btn" onClick={DeleteQna}>
              삭제하기{" "}
            </button>
          </div>
          <br />
          <h5>댓글</h5>
          <span id="qna_writer">{writer}</span>
          <div>
            <textarea
              id="qna_reply_content"
              name="contents"
              placeholder="댓글을 입력해주세요."
              value={newReply.contents}
              onChange={InputChange}
            ></textarea>
          </div>
          <div className="re_btn_area">
            <button id="qna_reply_btn" onClick={SaveReply}>
              저장하기
            </button>
          </div>
          <h5>댓글목록</h5>
          <ul>
            {replies.map((reply, index) => (
              <li key={reply.no}>
                {reply.writer} {new Date(board.registdate).toLocaleDateString()}{" "}
                <br />
                {reply.editing ? (
                  <>
                    <textarea
                      id="qna_reply_content"
                      value={reply.contents}
                      onChange={(e) => {
                        const updatedReplies = [...replies];
                        updatedReplies[index] = {
                          ...updatedReplies[index],
                          contents: e.target.value,
                        };

                        setReplies(updatedReplies);
                      }}
                    ></textarea>{" "}
                    <br />
                    <button onClick={() => SaveEditedReply(reply.no, index)}>
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    {reply.contents} <br />
                    <button onClick={() => EditReply(reply.no)}>
                      수정
                    </button>{" "}
                    <button onClick={() => DeleteReply(reply.no)}>삭제</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default QnaDetail;
