import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import "./Admin.css";

function RePayList() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/admin/repayList`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const requestRePay = async () => {
    try {
      const result = await axios.get(bootpath + "/admin/doRepay");
      if (result.data === "success") {
        alert("일괄 재결제 성공, 결제 실패자에 대해 개별 알림 발송");
      } else {
        alert("재결제 도중 문제가 발생했습니다.");
      }
    } catch (error) {
      alert("문제가 발생했습니다.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">재결제 예정 목록</h3>
          <button className="statusbtn" onClick={requestRePay}>
            일괄결제하기
          </button>
          <div>
            <ul>
              {data.map((data) => (
                <li key={data.no}>
                  {
                    <ul className="adminlist">
                      <p>no : {data.no}</p>
                      <p>펀딩멤버번호 : {data.fundingmemberno}</p>
                      <p>재결제 시도 횟수 : {data.repaycount}</p>
                      <hr></hr>
                    </ul>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default RePayList;
