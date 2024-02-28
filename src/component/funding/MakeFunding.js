import FundingHeader from "./FundingHeader";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";
import Calender from "./Calender";
import AddCardToFund from "./AddCardToFund";
import { useLocation } from "react-router-dom";
import RegistedImagePath from "../../registedImagePath";
import "./makefunding.css";
import "./../member/MemberInfo.css";
import { data } from "jquery";

function MakeFunding() {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [param, setParam] = useState({});
  const [file, setFile] = useState([]); //파일
  const [selectedCard, setSelectedCard] = useState(null);
  const location = useLocation();
  const { registedImagePath } = useContext(RegistedImagePath);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const dayOptions = [
    "---",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
  ];

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleChangeFile = (event) => {
    if (event.target.files[0] == null) {
      return;
    }
    setSelectedFile(event.target.files[0]);
    setUploadedImageUrl(URL.createObjectURL(event.target.files[0])); // 업로드된 이미지 URL 설정
    setFile(event.target.files[0]);
  };

  const handleSelectCard = (paymentNo) => {
    setSelectedCard(paymentNo);
    setParam({
      ...param,
      payment_no: paymentNo,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch({
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("사진이 변경되었습니다.");
      } else {
        console.error("사진 변경이 실패했습니다. 나중에 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleChange = (e) => {
    setParam({
      ...param,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {}, [file]);
  const getApi = () => {
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
      } else if (param.monthly_payment_date === "===") {
        alert("매월 결제일은 1일에서 28일까지만 선택 가능합니다.");
        e.preventDefault();
        return;
      } else if (!("payment_no" in param) || param.payment_no === "") {
        alert("정기 결제 될 카드를 선택해주세요.");
        e.preventDefault();
      }
    } else {
      alert("펀딩의 제목, 매월 결제금액, 매월 결제일은 필수 입력 사항입니다.");
      e.preventDefault();
      return;
    }
  };

  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">챌린지 생성</h3>

          <div>
            <input
              id={"main_title"}
              type="text"
              placeholder="챌린지 제목"
              name="title"
              onChange={handleChange}
              maxLength={18}
            />
          </div>
          <div>
            <div>
              <textarea
                id={"textarea"}
                name="description"
                maxLength="255"
                placeholder="설명은 255자 이하로 작성해 주세요"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="imgetag">
            <table className="img_add_table">
              <tr>
                <td rowSpan="5">
                  <div class="info_frame" id="info_frame">
                    <img
                      id="info_image"
                      onClick={handleImageClick}
                      src={uploadedImageUrl || `${registedImagePath}`}
                      width=""
                      alt="대표사진을 첨부해 주세요"
                    />
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChangeFile}
                  />
                  <br />
                </td>
              </tr>
            </table>

            <input type="file" id="file" onChange={handleChangeFile}></input>
          </div>
          <div className="finish_date">
            <p id={"title_tag2"}>마감일</p>
            <Calender className="calender" param={param} setParam={setParam} />
          </div>
          <div className={"payamount"}>
            <p id={"title_tag"}>결제 금액(매월)</p>
            <input
              id={"payinput"}
              type="number"
              name="monthly_payment_amount"
              onChange={handleChange}
            />
            <p id={"title_tag_back"}>원</p>
          </div>
          <div className={"paydate"}>
            <p id={"title_tag"}>결제 날짜(매월)</p>
            <select
              id="select"
              onChange={handleChange}
              //type="text"
              name="monthly_payment_date"
            >
              {dayOptions.map((option, idx) => (
                <option key={idx} value={idx}>
                  {option}
                </option>
              ))}
            </select>
            <p id={"title_tag_back"}>일</p>
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
