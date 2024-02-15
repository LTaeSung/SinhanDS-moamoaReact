import React, { useState, useEffect, useContext } from "react";
import BootPath from "./../../BootPath";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function AlarmList() {
  const { bootpath } = useContext(BootPath);
  const member_no = sessionStorage.getItem("no");
  const [data, setData] = useState([]);
  const getApi = async () => {
    axios.get(`${bootpath}/alarm/list?member_no=${member_no}`).then((res) => {
      setData(res.data);
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
          <div>
            <h3 className="sub_title">내 알림</h3>
          </div>
          <div>
            {data.length > 0 ? (
              <ul>
                {data &&
                  data.map((e, i) => (
                    <li key={i}>
                      <Link to={e.link}>
                        {e.content}
                        <br />
                      </Link>
                      <button onClick={() => earseAlarm(e.no)}>
                        알림 지우기
                      </button>
                      <br /> <br />
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
