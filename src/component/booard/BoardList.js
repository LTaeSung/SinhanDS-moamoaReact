import React, { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import axios from "axios";
import { Link } from "react-router-dom";

function BoardList() {
  const bootPath = useContext(BootPathContext);
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);

  const getApi = () => {
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
  }, []);

  return (
    <>
      {/* <BoardHeader /> */}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title"> 공지사항 </h3>
          <span>총 {totalElement} 건 </span>
          <div className="notices">
            <ul>
              {data.map((item) => (
                <li key={item.no}>
                  <Link to={`/board/list/${item.no}`}>{item.title}</Link>
                  <p>{item.registdate}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardList;
