import FundingHeader from "./FundingHeader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bootPath from "../../BootPath";
import CommonImagePath from "../../commonImagePath";
function JoinFundingList() {
  const { bootpath } = useContext(bootPath);
  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const getApi = async () => {
    axios
      .get(`${bootpath}/funding/member/join?member_no=${member_no}`)
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getApi();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">참여한 펀딩 리스트</h3>
          <div>
            {data.length > 0 ? (
              <>
                <ul>
                  {data.map((Data) => (
                    <li key={Data.no}>
                      <div>ㄹㄹ</div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>참여한 펀딩이 없어요!</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinFundingList;
