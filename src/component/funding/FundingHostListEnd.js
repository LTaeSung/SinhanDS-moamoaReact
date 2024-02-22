import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";
import "./FundingHostListEnd.css";

const FundingHostListEnd = ({ render, setRender }) => {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
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
                      Data.stateMessage
                    }
                  >
                    <div className="list_container">
                      <div className="image_container">
                        <img
                          id="hosted_funding_image"
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

                        <div className="fund_amount">
                          <p>{Data.settlementAmount}</p>
                          <p>{Data.myPayAmount}</p>
                          <p>{Data.message}</p>
                          <div
                            className="status_bar_end"
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
          <>참여한 펀딩이 없어요!</>
        )}
      </div>
    </>
  );
};

export default FundingHostListEnd;
