import { useContext, useEffect, useState } from "react";
import BootPathContext from "./../../BootPath";
import axios from "axios";
import { Link } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import "./boardlist.css";

function BoardList() {
  const bootPath = useContext(BootPathContext);
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${bootPath.bootpath}/board/list/notice`
        );

        setData(response.data);
        setTotalElement(response.data.length);
      } catch (error) {
        console.log("error 발생", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BoardHeader />
      <div className="sub">
        <div className="size">
          <div className="slect">
            <span className="span_title">공지사항</span>
            <span>총 {totalElement} 건 </span>
          </div>
          <br />
          <div className="notices">
            <ul>
              {data.map((item) => (
                <li key={item.no} className="liWithUnderBar">
                  <Link to={`/board/detail?no=${item.no}`}>
                    <div>{item.title}</div>
                    <p>
                      안내 | {new Date(item.registdate).toLocaleDateString()}
                    </p>
                  </Link>
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
