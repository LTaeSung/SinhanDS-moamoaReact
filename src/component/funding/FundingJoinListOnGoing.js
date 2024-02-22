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
                    <div className="list_container_join_ongoing">
                      <div className="image_container_join_ongoing">
                        <img
                          id="joined_funding_image_join_ongoing"
                          src={
                            Data.photo
                              ? registedImagePath + Data.photo
                              : registedImagePath + "challenge.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="fund_info_join_ongoing">
                        <div className="fund_title_join_ongoing">
                          {Data.title}
                        </div>
                        <br />
                        <br />

                        <div
                          className="fund_status_join_ongoing"
                          style={{ color: Data.color }}
                        >
                          {Data.stateMessage}

                          <div className="fund_amount_join_ongoing">
                            <span className="all_amount_join_ongoing">
                              총 금액:{Data.totalPayAmount}
                            </span>
                            <span className="day_left_join_ongoing">
                              {Data.dueDateLeft}일 남음
                            </span>
                            <div
                              className="status_bar_start_join_ongoing"
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
