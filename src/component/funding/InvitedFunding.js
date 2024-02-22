import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RegistedImagePath from "../../registedImagePath";
import "./InvitedFunding.css";

function InvitedFunding() {
  const { bootpath } = useContext(BootPath);
  const { registedImagePath } = useContext(RegistedImagePath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const navigate = useNavigate();
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
          <div className="space_container"></div>
          <h3 className="sub_title">초대받은 펀딩 리스트</h3>
          <div className="space_container"></div>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li className="liner" key={Data.no}>
                  <div className="list_container">
                    <div className="image_container">
                      <img
                        id="invited_funding_image"
                        src={
                          Data.photo
                            ? registedImagePath + Data.photo
                            : registedImagePath + "challenge.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="fund_info">
                      <div className="fund_title">
                        {Data.startmembername}님이 {Data.fundtitle}에
                        초대하였습니다.
                      </div>
                      <br />
                      <p>초대 수락 기한 : {Data.inviteddate.split("T")[0]}</p>
                      <p> 결제액 : 매월 {Data.monthlypaymentamount}원</p>
                      <Link
                        to="/funding/accept"
                        state={{
                          fundingMemberNo: Data.no,
                          fundingNo: Data.fundingno,
                        }}
                      >
                        <button className="invite_agree">수락</button>
                      </Link>
                      &nbsp;
                      <button
                        className="invite_refuse"
                        onClick={refuse}
                        id={Data.no}
                      >
                        거절
                      </button>
                      <br />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {" "}
              <div>
                초대받은 펀드가 없습니다
                <br /> 펀드를 새로 만들어보세요!
              </div>
              <Link to="/funding/make">펀드 만들기</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default InvitedFunding;
