import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";
import CommonImagePath from "../../commonImagePath";
import "./FundingHostListOnGoing.css";

const FundingHostListOnGoing = ({ render, setRender }) => {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
  const { commonImagePath } = useContext(CommonImagePath);
  const getApi = async () => {
    axios
      .get(`${bootpath}/fund/host/ongoing?member_no=${member_no}`)
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
                <li key={Data.fundingNo} className="liWithUnderBar">
                  <Link to={"/funding/info?no=" + Data.fundingNo}>
                    <div className="list_container_host_ongoing">
                      <div className="image_container_host_ongoing">
                        <img
                          id="hosted_funding_image_host_ongoing"
                          src={
                            Data.photo
                              ? registedImagePath + Data.photo
                              : commonImagePath + "challenge.jpg"
                          }
                          alt=""
                        />
                      </div>

                      <div className="fund_info_host_ongoing">
                        <div className="fund_title_host_ongoing">
                          {Data.title}
                        </div>
                        <br />
                        <br />

                        <div
                          className="fund_status_host_ongoing"
                          style={{ color: Data.color }}
                        >
                          {Data.stateMessage}

                          <div className="fund_amount_host_ongoing">
                            <span className="all_amount_host_ongoing">
                              총 금액: {Data.totalPayAmount}
                            </span>
                            <span className="day_left_host_ongoing">
                              {Data.dueDateLeft}일 남음
                            </span>

                            <div
                              className="status_bar_host_start"
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
          <>
            <div className="space_container_invited"></div>
            <div>
              <img
                className="no_fund_search"
                src={`${registedImagePath}no_money.png`}
                alt=""
                width={100}
              />
              <div className="space_container_invited"></div>
              <div className="no_fund_text">
                주최한 펀드가 없습니다.
                <br /> 펀드를 새로 만들어보세요!
              </div>
            </div>
            <Link id="go_make_fund" to="/funding/make">
              펀드 만들기
            </Link>
            <div className="space_container_invited2"></div>
          </>
        )}
      </div>
    </>
  );
};

export default FundingHostListOnGoing;
