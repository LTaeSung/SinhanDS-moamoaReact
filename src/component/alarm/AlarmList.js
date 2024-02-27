import React, { useState, useEffect, useContext } from "react";
import BootPath from "./../../BootPath";
import Formatter from "./../../Formatter_notime";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alarmlist.css";
import EmptyHeader from "./../../EmptyHeader";
import CommonImagePath from "../../commonImagePath";

function AlarmList() {
  const { bootpath } = useContext(BootPath);
  const { commonImagePath } = useContext(CommonImagePath);
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
        <div className="size_alarm">
          <span id="alarm_span_title">내 알림</span>
          <span>총 {totalElement} 건 </span>
          <div className="line">
            {data.length > 0 ? (
              <ul>
                {data &&
                  data.map((e, i) => (
                    <li key={i} id="alarm_li">
                      <Link to={e.link}>
                        <p id="title">{e.content}</p>
                      </Link>
                      <div id="delbtn_area">
                        <button id="btn" onClick={() => earseAlarm(e.no)}>
                          삭제
                        </button>
                      </div>
                      <div id="date_area">
                        <p id="date">
                          {formatter.format(new Date(e.alarmdate))}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <>
                <div className="space_container_invited2"></div>
                <div>
                  <img
                    className="no_fund_search"
                    src={`${commonImagePath}header_bell.png`}
                    alt=""
                    width={100}
                  />
                  <div className="space_container_invited"></div>
                  <div className="no_fund_text">
                    알림 내역이 없습니다.
                    <br /> 새로운 펀드를 만들어보세요!
                  </div>
                </div>
                <Link id="go_make_fund" to="/funding/make">
                  펀드 만들기
                </Link>
                <div className="space_container_invited2"></div>
              </>
            )}
          </div>
        </div>
      </div>{" "}
      <EmptyHeader />
    </>
  );
}

export default AlarmList;
