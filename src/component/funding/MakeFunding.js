import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";
import Calender from "./Calender";

function MakeFunding() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [param, setParam] = useState({});
  const [file, setFile] = useState([]); //파일
  const handleChange = (e) => {
    setParam({
      ...param,
      [e.target.name]: e.target.value,
    });
    console.log(param);
  };
  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    console.log(file);
  }, [file]);
  const getApi = () => {
    console.log(param);
    axios.post(bootpath + "/fund/regist", param).then((res) => {
      if (res.data.result === "success") {
        alert("정상적으로 저장되었습니다.");
        navigate("/board/list");
      }
    });
  };
  const save = () => {
    getApi();
  };

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀드 생성</h3>

          <div>
            펀딩명 <input type="text" name="title" onChange={handleChange} />
          </div>
          <div>
            설명
            <div>
              <textarea
                name="description"
                maxLength="255"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            사진
            <input type="file" id="file" onChange={handleChangeFile}></input>
          </div>
          <div>
            마감일
            <Calender param={param} setParam={setParam} />
          </div>
          <div>
            결제 금액(매월)
            <input
              type="number"
              name="monthly_payment_amount"
              onChange={handleChange}
            />
            원
          </div>
          <div>
            결제 날짜(매월)
            <input
              type="text"
              name="monthly_payment_date"
              //value="1"
              onChange={handleChange}
            />
            일
          </div>
          <div className="btnSet" style={{ textAlign: "right" }}>
            <Link
              className="btn"
              to="/funding/inviteMember"
              state={{ param: param, file: file }}
            >
              맴버 초대
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeFunding;
