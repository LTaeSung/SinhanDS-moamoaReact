import { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function FundingComment() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);
  const [param, setParam] = useState({});
  const [writer, setWriter] = useState("");
  const [no, setNo] = useState("");
  const [newReply, setNewReply] = useState({ contents: "" });

  let funding_no = params.get("no");

  const getReplyApi = async () => {
    axios
      .get(`${bootPath.bootpath}/funding/comment/list?fundingno=${funding_no}`)
      .then((res) => {
        setData(res.data);
        setTotalElement(res.data.length);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("funding_no값이 없습니다. ", error);
      });
  };

  useEffect(() => {
    getReplyApi();
  }, []);

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const no = sessionStorage.getItem("no");
    setWriter(name || "");
    setNo(Number(no) || "");
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

  //댓글등록
  const input = (e) => {
    setNewReply({ contents: e.target.value });
  };

  const commentSubmit = async () => {
    try {
      const response = await axios.post(
        `${bootPath.bootpath}/funding/comment/add`,
        {
          name: writer,
          contents: newReply.contents,
          photo: "",
          fundingno: funding_no,
        }
      );
      setData((prevData) => [...prevData, response.data]);
      setTotalElement((prevTotal) => prevTotal + 1);
      setNewReply({ contents: "" });
    } catch (error) {
      console.log("에러발생", error);
    }
  };

  return (
    <>
      <div>{writer}</div>
      <div>
        <textarea
          value={newReply.contents}
          placeholder="댓글을 입력하세요."
          onChange={input}
        ></textarea>{" "}
        <br />
        <button onClick={commentSubmit}>댓글 저장</button>
      </div>
      <p>--------댓글목록----------</p>
      <p>총 댓글 수 : {totalElement} </p>
      {data &&
        data.map((item) => (
          <div key={item.no}>
            {item.name}
            {item.contents}
          </div>
        ))}
    </>
  );
}

export default FundingComment;
