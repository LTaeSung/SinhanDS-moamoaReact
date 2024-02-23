import React, { useState, useEffect, useContext } from "react";
import BootPath from "./../../BootPath";
import Formatter from "./../../Formatter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alarmlist.css";
function AlarmList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);
  const formatter = Formatter;
  const getApi = async () => {
    axios.get(`${bootpath}/alarm/list?member_no=${member_no}`).then((res) => {
      setData(res.data);
      setTotalElement(res.data.length);
    });
  };
  useEffect(() => {
    getApi();
  }, []);

  const earseAlarm = (alarmNo) => {
    axios.get(`${bootpath}/alarm/erase?alarm_no=${alarmNo}`).then((res) => {
      getApi();
    });
  };
  return (
    <>
      <div className="sub">
        <div className="size">
          <span id="alarm_span_title">내 알림</span>
          <span>총 {totalElement} 건 </span>
          <div className="line">
            {data.length > 0 ? (
              <ul>
                {data &&
                  data.map((e, i) => (
                    <li key={i}>
                      <Link to={e.link}>
                        <p id="title">{e.content}</p>
                        <p id="date">
                          {formatter.format(new Date(e.alarmdate))}
                        </p>
                      </Link>
                      <button id="btn" onClick={() => earseAlarm(e.no)}>
                        삭제
                      </button>
                      <hr id="hr"></hr>
                    </li>
                  ))}
              </ul>
            ) : (
              <>없어용</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AlarmList;
