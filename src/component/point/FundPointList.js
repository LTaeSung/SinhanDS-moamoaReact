import MemberHeader from "../member/MemberHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BootPath from "../../BootPath";
import ReactPath from "../../ReactPath";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import "./FundPointList.css";

function FundPointList() {
  const { reactpath } = useContext(ReactPath);
  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    navigate(selectedValue); // 선택된 값으로 페이지를 업데이트
  };
  const { bootpath } = useContext(BootPath);

  const [data, setData] = useState([]);
  const member_no = sessionStorage.getItem("no");
  const getData = async () => {
    try {
      if (!member_no) {
        alert("사용자 정보에 오류가 있습니다. 다시 로그인 해주세요.");
        return;
      }
      const response = await axios.get(
        ` ${bootpath}/point/funding_history/mypointHistory?member_no=${member_no}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MemberHeader />
      <div className="sub">
        <div className="size">
          <div className="space_container"></div>
          <h3 className="sub_title">펀드포인트 정보</h3>
          <div className="selectBox_container">
            <select className="option" onChange={handleSelectChange}>
              <option value="/point/Fundpointlist">
                펀드 포인트 거래 내역
              </option>
              <option value="/point/pointlist">포인트 내역</option>
            </select>
          </div>
          <div className="space_container"></div>
          <div>
            {member_no ? (
              <>
                {
                  <ul>
                    {data.map((data) => (
                      <li key={data.no}>
                        {data.direction === false ? (
                          <ul>
                            <div className="fontDate_container">
                              <div className="font">결제</div>

                              <p className="date">
                                {data.transactiondate.split("T")[0]}
                              </p>
                            </div>

                            <div className="noAmount_container">
                              <p className="no">
                                {" "}
                                <Link
                                  to={`${reactpath}/funding/info?no=${data.fundingno}`}
                                >
                                  펀딩 상세보기로 이동
                                </Link>
                              </p>
                              <p className="amount">{data.amount}원</p>
                            </div>
                          </ul>
                        ) : (
                          <ul>
                            <div className="fontDate_container">
                              <div className="font">정산</div>
                              <p className="date">
                                {data.transactiondate.split("T")[0]}
                              </p>
                            </div>

                            <div className="noAmount_container">
                              <p className="no">
                                <Link
                                  to={`${reactpath}/funding/info?no=${data.fundingno}`}
                                >
                                  펀딩 상세보기로 이동
                                </Link>
                              </p>
                              <p className="amount">{data.amount}원</p>
                            </div>
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                }
              </>
            ) : (
              <p>login</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FundPointList;
