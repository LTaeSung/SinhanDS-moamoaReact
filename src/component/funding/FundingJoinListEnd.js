import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bootPath from "../../BootPath";
import CommonImagePath from "../../commonImagePath";
import RegistedImagePath from "../../registedImagePath";
import $ from "jquery";
function JoinFundingList() {
  const { bootpath } = useContext(bootPath);
  const { registedImagePath } = useContext(RegistedImagePath);
  const [data, setData] = useState([]);
  const selectList = [
    { no: 0, name: "진행중", link: "onGoing" },
    {
      no: 1,
      name: "완료",
      link: "end",
    },
  ];
  const [selected, setSelected] = useState({
    no: 1,
    name: "완료",
    link: "end",
  });
  console.log(selected);
  const member_no = sessionStorage.getItem("no");
  const getApi = async () => {
    axios
      .get(`${bootpath}/funding/member/join/end?member_no=${member_no}`)
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  const move = (e) => {
    setSelected(selectList[e.target.value]);
    console.log(e.target.value);
    console.log(selectList[e.target.value]);
    window.location.href =
      "/funding/member/join/" + selectList[e.target.value].link;
  };

  return (
    <>
      <div>
        {data.length > 0 ? (
          <>
            <ul>
              {data.map((Data) => (
                <li key={Data.fundingNo}>
                  <Link
                    to={
                      "/funding/info?no=" +
                      Data.fundingNo +
                      "&stateMessage=" +
                      Data.stateMessage
                    }
                  >
                    <img src={registedImagePath + Data.photo} width="100" />
                    <div>펀드명 : {Data.title}</div>
                    <div>내가 낸 금액 : {Data.myPayAmount}</div>
                    <div>전체 모인 금액: {Data.totalPayAmount}</div>
                    <div>상태 : {Data.stateMessage}</div>
                    <div>남은 일수 : {Data.dueDateLeft}</div>
                    <div>상태 색 : {Data.color}</div>
                  </Link>

                  <br />
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>참여한 펀딩이 없어요!</>
        )}
      </div>
    </>
  );
}

export default JoinFundingList;
