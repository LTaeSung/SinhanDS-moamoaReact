import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";
import "./FundingJoinListEnd.css";
import CommonImagePath from "../../commonImagePath";

const FundingJoinListEnd = ({ render, setRender }) => {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
  const { commonImagePath } = useContext(CommonImagePath);
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
                    <div className="list_container_join_end">
                      <div className="image_container_join_end">
                        <img
                          id="joined_funding_image_join_end"
                          src={
                            Data.photo
                              ? registedImagePath + Data.photo
                              : commonImagePath + "challenge.jpg"
                          }
                          alt={""}
                        />
                      </div>

                      <div className="fund_info_join_end">
                        <div className="fund_title_join_end">{Data.title}</div>
                        <br />

                        <div className="fund_amount_join_end">
                          <p>{Data.settlementAmount}</p>
                          <p>{Data.myPayAmount}</p>
                          <p>{Data.message}</p>

                          <div
                            className="status_bar_join_end"
                            style={{
                              width: "270px", // 너비
                              height: "4px", // 높이
                              backgroundColor: "black", // 배경색
                            }}
                          ></div>
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
                참여했던 펀드가 없습니다.
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

export default FundingJoinListEnd;
