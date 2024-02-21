import React, { useState, useEffect, useContext } from "react";
import BootPath from "./../../BootPath";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alarmlist.css";
function AlarmList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const [totalElement, setTotalElement] = useState(0);
  const [data, setData] = useState([]);
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
    console.log(alarmNo);
    axios.get(`${bootpath}/alarm/erase?alarm_no=${alarmNo}`).then((res) => {
      getApi();
    });
  };
  return (
    <>
      <div className="sub">
        <div className="size">
          <div id="alarmtitle">
            <h3 className="sub_title">내 알림</h3>
          </div>
          <div className="slect">
            <span className="span_title">내 알림</span>
            <span>총 {totalElement} 건 </span>
            <select>
              <option value="0">전체</option>
              <option value="1">확인됨</option>
            </select>
          </div>
          <div>
            {data.length > 0 ? (
              <ul>
                {data &&
                  data.map((e, i) => (
                    <li key={i}>
                      <Link to={e.link}>
                        <p id="title">{e.content}</p>
                        <p id="date">{e.alarmdate.split(".")[0]}</p>
                      </Link>
                      <button id="btn" onClick={() => earseAlarm(e.no)}>
                        삭제
                      </button>
                      <br />
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
