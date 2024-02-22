import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import Formatter from "./../../Formatter";
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
      console.log(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // const accept = async (e) => {
  //   let param = {};
  //   param = { no: e.target.id };
  //   await axios.post(bootpath + "/funding/member/accept", param).then((res) => {
  //     if (res.data === "success") {
  //       window.alert("성공적으로 삭제되었습니다.");
  //     } else {
  //       console.log(res);
  //       window.alert("삭제 실패.");
  //     }
  //   });
  //   getData();
  // };
  const refuse = async (e) => {
    let param = {};
    param = { no: e.target.id };
    console.log(param);
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
          <h3 className="sub_title_invited">초대받은 펀딩 리스트</h3>
          <div className="space_container_invited"></div>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li key={Data.fundingMemberNo}>
                  <div className="list_container_invited">
                    <div className="image_container_invited">
                      <img
                        id="invited_funding_image_invited"
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
                      <br />
                      <p>
                        펀딩마감기한 :{" "}
                        {/* {new Date(Data.fundingDueDate).toISOString().split("T")[0]} */}
                        {formatter.format(new Date(Data.fundingDueDate))}
                      </p>
                      <p> 결제액 : 매월 {Data.monthlyPaymentAmmount}원</p>

                      <div>
                        <Link
                          to="/funding/accept"
                          state={{
                            fundingMemberNo: Data.fundingMemberNo,
                            fundingNo: Data.fundingNo,
                          }}
                        >
                          <button className="invite_agree_invited">수락</button>
                        </Link>
                        &nbsp;
                        <button
                          className="invite_refuse_invited"
                          onClick={refuse}
                          id={Data.fundingMemberNo}
                        >
                          거절
                        </button>
                        <br />
                      </div>
                    </div>
                  </div>
                  <hr id="final_line"></hr>{" "}
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
                  초대받은 펀드가 없습니다
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
      </div>
    </>
  );
}

export default InvitedFunding;
