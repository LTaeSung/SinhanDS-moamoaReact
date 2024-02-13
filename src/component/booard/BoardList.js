import React, { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import axios from "axios";

function BoardList() {
  const bootPath = useContext(BootPathContext);
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);

  const getApi = () => {
    console.log(`${bootPath.bootpath}/board/list`);
    axios
      .get(`${bootPath.bootpath}/board/list`)
      .then((res) => {
        setData(res.data);
        setTotalElement(res.data.length);
      })
      .catch((error) => {
        console.log("공지사항이 없습니다.", error);
      });
  };

  useEffect(() => {
    getApi();
  });

  return (
    <form>
      <table className="boardTag">
        <caption>게시판 목록</caption>
        <colgroup>
          <col width="110px" />
          <col width="110px" />
          <col width="110px" />
        </colgroup>
        <thead>
          <tr>
            <th>도움말</th>
            <th>공지사항</th>
            <th>Q & A</th>
          </tr>
        </thead>
      </table>
      <div className="boardName">
        <span>
          <strong>공지사항</strong> 총 {totalElement} 건
        </span>
      </div>
      <br />
      <div className="notices">
        {data.map((item) => (
          <div key={item.no}>
            <p>{item.title}</p>
            <p>{item.registdate}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default BoardList;
