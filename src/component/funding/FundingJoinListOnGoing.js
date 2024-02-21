import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";
import "./FundingJoinListOnGoing.css";

const FundingJoinListOnGoing = ({ render, setRender }) => {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);

  const getApi = async () => {
    axios
      .get(`${bootpath}/funding/member/join/ongoing?member_no=${member_no}`)
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      <div>
        {data.length > 0 ? (
          <>
            <ul>
              {data.map((Data) => (
                <li key={Data.fundingNo}>
                  <Link to={"/funding/info?no=" + Data.fundingNo}>
                    <div className="list_container">
                      <div className="image_container">
                        <img
                          id="joined_funding_image"
                          src={
                            Data.photo
                              ? registedImagePath + Data.photo
                              : registedImagePath + "challenge.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="fund_info">
                        <div className="fund_title">{Data.title}</div>
                        <br />

                        <div
                          className="fund_status"
                          style={{ color: Data.color }}
                        >
                          {Data.stateMessage}

                          <div className="fund_amount">
                            <span className="all_amount">
                              총 금액:{Data.totalPayAmount}
                            </span>
                            <span className="day_left">
                              {Data.dueDateLeft}일 남음
                            </span>
                            <div
                              className="status_bar_start"
                              style={{
                                width: "270px", // 너비
                                height: "4px", // 높이
                                backgroundColor: Data.color, // 배경색
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
};

export default FundingJoinListOnGoing;
