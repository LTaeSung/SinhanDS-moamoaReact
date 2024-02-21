import FundingHeader from "./FundingHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RegistedImagePath from "../../registedImagePath";

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
          <h3 className="sub_title">초대받은 펀딩 리스트</h3>
          {data ? (
            <ul>
              {data.map((Data) => (
                <li key={Data.no}>
                  <div>
                    <img src={registedImagePath + Data.photo} width="100" />
                  </div>
                  <div>
                    {Data.no} , {Data.startmembername}님이 {Data.fundtitle}에
                    초대하였습니다.
                    <br />
                    펀드번호 : {Data.fundingno}
                    <br />
                    초대 수락 기한 : {Data.inviteddate}
                    <br />
                    결제액 : 매월 {Data.monthlypaymentamount}원
                    <br />
                    <div>
                      <Link
                        className="btn"
                        to="/funding/accept"
                        state={{
                          fundingMemberNo: Data.no,
                          fundingNo: Data.fundingno,
                        }}
                      >
                        수락
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <button onClick={refuse} id={Data.no}>
                        거절
                      </button>
                    </div>
                    <br />
                    <br />
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
