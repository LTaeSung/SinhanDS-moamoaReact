import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";
import CommonImagePath from "../../commonImagePath";

const FundingHostListEnd = ({ render, setRender }) => {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
  const { commonImagePath } = useContext(CommonImagePath);
  const getApi = async () => {
    axios
      .get(`${bootpath}/fund/host/end?member_no=${member_no}`)
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
                  <Link
                    to={
                      "/funding/info?no=" +
                      Data.fundingNo +
                      "&stateMessage=" +
                      Data.stateMessage +
                      "&messageNo=" +
                      Data.messageNo +
                      "&fundingMemberNo=" +
                      Data.fundingMemberNo
                    }
                  >
                    <div className="list_container_join_ongoing">
                      <div className="image_container_join_ongoing">
                        <img
                          id="joined_funding_image_join_ongoing"
                          src={
                            Data.photo
                              ? registedImagePath + Data.photo
                              : commonImagePath + "challenge.jpg"
                          }
                          alt={""}
                        />
                      </div>

                      <div className="fund_info_join_ongoing">
                        <div className="fund_title_join_ongoing">
                          {Data.title}
                        </div>
                        <br />

                        <div
                          className="fund_status_join_ongoing"
                          style={{ color: "black" }}
                        >
                          내가 받은 금액 : {Data.settlementAmount}
                          <div className="fund_amount_join_ongoing">
                            <span className="all_amount_join_ongoing">
                              내가 낸 금액 : {Data.myPayAmount}
                            </span>

                            <span className="day_left_join_ongoing">
                              {Data.message}
                            </span>

                            <div
                              className="status_bar_start_join_ongoing"
                              style={{
                                width: "270px", // 너비
                                height: "4px", // 높이
                                backgroundColor: "black", // 배경색
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
                src={`${commonImagePath}no_money.png`}
                alt=""
                width={100}
              />
              <div className="space_container_invited"></div>
              <div className="no_fund_text">
                주최했던 펀드가 없습니다.
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

export default FundingHostListEnd;
