import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import Formatter from "./../../Formatter_notime";
import { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RegistedImagePath from "../../registedImagePath";
import CommonImagePath from "../../commonImagePath";

import "./InvitedFunding.css";

function InvitedFunding() {
  const { bootpath } = useContext(BootPath);
  const { registedImagePath } = useContext(RegistedImagePath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const navigate = useNavigate();

  const formatter = Formatter;

  const { commonImagePath } = useContext(CommonImagePath);

  const getData = async () => {
    try {
      if (!member_no) {
        console.log("사용자 번호가 없습니다.");
        return;
      }
      const response = await axios.get(
        `${bootpath}/funding/member/invitedList?member_no=${member_no}`
      );

      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const refuse = async (e) => {
    let param = {};
    param = { no: e.target.id };
    await axios.post(bootpath + "/funding/member/refuse", param).then((res) => {
      if (res.data === "success") {
        window.alert("초대를 거절했습니다.");
        navigate(0);
      } else {
        console.log(res);
        window.alert("삭제 실패.");
      }
    });
    getData();
  };
  return (
    <>
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <div className="space_container_invited"></div>
          <h3 className="sub_title_invited">초대받은 챌린지 리스트</h3>
          <div className="space_container_invited"></div>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li key={Data.fundingMemberNo} className="liWithUnderBar">
                  <div className="list_container_join_ongoing">
                    <div className="image_container_join_ongoing">
                      <img
                        id="joined_funding_image_join_ongoing"
                        src={
                          Data.photo
                            ? registedImagePath + Data.photo
                            : commonImagePath + "challenge.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="fund_info_invited">
                      <div className="fund_title_invited">
                        {Data.startMemberName}님이 {Data.fundTitle}에
                        초대하였습니다.
                      </div>
                      <div
                        className="fund_status_join_ongoing"
                        style={{ color: Data.color }}
                      >
                        {" "}
                        마감일 :{" "}
                        {/* {new Date(Data.fundingDueDate).toISOString().split("T")[0]} */}
                        {formatter.format(new Date(Data.fundingDueDate))}
                        <div className="fund_amount_join_ongoing">
                          <span className="all_amount_join_ongoing">
                            결제액 : {Data.monthlyPaymentAmmount}원/월
                          </span>
                          <div className="buttonDiv">
                            <div>
                              <Link
                                to="/funding/accept"
                                state={{
                                  fundingMemberNo: Data.fundingMemberNo,
                                  fundingNo: Data.fundingNo,
                                }}
                              >
                                <button className="invite_agree_invited">
                                  <p>수락</p>
                                </button>
                              </Link>
                            </div>
                            <div>
                              <button
                                className="invite_refuse_invited"
                                onClick={refuse}
                                id={Data.fundingMemberNo}
                              >
                                <p>거절</p>
                              </button>
                            </div>

                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div>
                <img
                  className="no_fund_search"
                  src={`${commonImagePath}no_mail.png`}
                  alt=""
                  width={100}
                />
                <div className="space_container_invited"></div>
                <div className="no_fund_text">
                  초대받은 챌린지가 없습니다
                  <br /> 챌린지를 새로 만들어보세요!
                </div>
              </div>
              <Link id="go_make_fund_invited" to="/funding/make">
                챌린지 만들기
              </Link>
              <div className="space_container_invited2"></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default InvitedFunding;
