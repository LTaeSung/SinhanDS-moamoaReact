import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";
import $ from "jquery";
import Calender from "./Calender";
import AddCardToFund from "./AddCardToFund";
import { useLocation } from "react-router-dom";

function MakeFunding() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [param, setParam] = useState({});
  const [file, setFile] = useState([]); //파일
  const [selectedCard, setSelectedCard] = useState(null);
  const location = useLocation();

  const handleSelectCard = (paymentNo) => {
    setSelectedCard(paymentNo);
    setParam({
      ...param,
      payment_no: paymentNo,
    });
  };

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

  const emptyCheck = (e) => {
    console.log("empty check");
    console.log(param);
    if (
      "title" in param &&
      "monthly_payment_amount" in param &&
      "monthly_payment_date" in param
    ) {
      if (param.title.replace(" ", "") === "") {
        alert("제목은 비워둘 수 없습니다.");
        e.preventDefault();
      } else if (param.monthly_payment_amount < 1) {
        alert("매월 결제 금액은 1원 이상이어야 합니다.");
        e.preventDefault();
      } else if (!("payment_no" in param) || param.payment_no === "") {
        alert("정기 결제 될 카드를 선택해주세요.");
        e.preventDefault();
      }
      console.log("check");
    } else {
      alert("펀딩의 제목, 매월 결제금액, 매월 결제일은 필수 입력 사항입니다.");
      e.preventDefault();
      return;
    }
  };

  const dayOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ];

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
            <select
              onChange={handleChange}
              //type="text"
              name="monthly_payment_date"
            >
              {dayOptions.map((option, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
            일
          </div>
          <AddCardToFund onSelectCard={handleSelectCard} />
          <div className="btnSet" style={{ textAlign: "right" }}>
            <Link
              className="btn"
              to="/funding/inviteMember"
              onClick={emptyCheck}
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
