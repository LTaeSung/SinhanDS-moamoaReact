import React, { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import axios from "axios";
import { Link } from "react-router-dom";

function QnaList() {
  const bootPath = useContext(BootPathContext);
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${bootPath.bootpath}/board/list`);
        const filteredDate = response.data.filter((item) => item.boardtype);
        setData(filteredDate);
        setTotalElement(filteredDate.length);
      } catch (error) {
        console.log("error 남", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <BoardHeader /> */}
      <div className="sub">
        <div className="size">
          <h3 className="sub_title"> QNA </h3>
          <span>총 {totalElement} 건 </span>
          <div className="qna-list">
            <ul>
              {data.map((item) => (
                <li key={item.no}>
                  <Link to={`/board/qna/detail?no=${item.no}`}>
                    {item.title}
                  </Link>
                  <p>{new Date(item.registdate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default QnaList;
