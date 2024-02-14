import MemberHeader from "./../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import axios from "axios";

function PointList() {
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
        ` ${bootpath}/point/point_history/mypointHistory?member_no=${member_no}`
      );
      setData(response.data);
      console.log(response.data);
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
          <h3 className="sub_title">포인트 정보</h3>
          <div>
            {member_no ? (
              <>
                {
                  <ul>
                    {data.map((data) => (
                      <li key={data.no}>
                        {data.direction === false ? (
                          <ul>
                            <p>충전</p>
                            <p>{data.transactiondate}</p>
                            <p>주문번호 : {data.merchantuid}</p>
                            <p>결제금액 : {data.amount}</p>
                          </ul>
                        ) : (
                          <ul>
                            <p>인출</p>
                            <p>{data.transactiondate}</p>
                            <p>
                              인출계좌 : {data.bank} {data.account}
                            </p>
                            <p>결제금액 : {data.amount}</p>
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

export default PointList;
