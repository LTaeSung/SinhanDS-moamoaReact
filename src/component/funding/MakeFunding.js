import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";
import $ from "jquery";
function MakeFunding() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [param, setParam] = useState({});
  const handleChange = (e) => {
    setParam({
      ...param,
      [e.target.name]: e.target.value,
    });
  };
  const getApi = () => {
    console.log(param);
    axios.post(bootpath + "/fund/regist", param).then((res) => {
      console.log(res);
      if (res.data.result === "success") {
        alert("정상적으로 저장되었습니다.");
        navigate("/board/list");
      }
    });
  };
  const save = () => {
    getApi();
  };

  $(function () {
    $("#endDate").datepicker({
      dayNamesMin: ["월", "화", "수", "목", "금", "토", "일"],
      dayNames: [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
      ],
      monthNamesShort: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      dateFormat: "yy-mm-dd",
      minDate: "-90D",
      maxDate: "+oD",
    });
  });
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀드 생성</h3>
          <input
            class="aaa"
            type="text"
            id="endDate"
            name="endDate"
            placeholder="검색 끝 날짜"
          />
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
          <div>사진</div>
          <div>
            마감일
            <input
              type="text"
              name="funding_due_date"
              //value="2024-06-09"
              onChange={handleChange}
            />
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
              state={{ param: param }}
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
