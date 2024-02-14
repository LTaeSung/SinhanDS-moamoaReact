import React, { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import axios from "axios";
import { Link } from "react-router-dom";

function QnaList() {
  const bootPath = useContext(BootPathContext);
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);

  const getApi = () => {
    axios
      .get(`${bootPath.bootpath}/board/qna/list`)
      .then((res) => {
        setData(res.data);
        setTotalElement(res.data.length);
      })
      .catch((error) => {
        console.log("qna가 없습니다.", error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      {/* <BoardHeader /> */}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title"> QNA </h3>
          <span>총 {totalElement} 건 </span>
          <p>qna 작성하기</p>
          <div>
            <input type="text" name="writer" placeholder="writer"></input>
          </div>
          <div>
            <textarea name="contents" placeholder="content"></textarea>
          </div>
          <button>저장하기</button>
          <p>qna 목록</p>
        </div>
      </div>
    </>
  );
}

export default QnaList;
