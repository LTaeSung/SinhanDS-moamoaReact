import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bootPath from "../../BootPath";
import RegistedImagePath from "../../registedImagePath";

const FundingJoinListEnd = ({ render, setRender }) => {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
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
                <li key={Data.fundingNo}>
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
                    <img src={registedImagePath + Data.photo} width="100" />
                    <div>펀드명 : {Data.title}</div>
                    <div>내가 낸 금액 : {Data.myPayAmount}</div>
                    <div>내가 받은 금액: {Data.settlementAmount}</div>
                    <div>메세지 : {Data.message}</div>
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
};

export default FundingJoinListEnd;
