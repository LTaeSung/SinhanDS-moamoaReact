import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import "./Admin.css";

function RegularPayList() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/admin/regularPaymentList`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const requestRegularPay = async () => {
    try {
      const result = await axios.get(bootpath + "/admin/regularPayment");
      if (result.data === "success") {
        alert("일괄결제 성공, 결제 실패자에 대해 개별 알림 발송");
      } else {
        alert("일괄결제 도중 문제가 발생했습니다.");
      }
    } catch (error) {
      alert("일괄결제 도중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">오늘 결제 예정 목록</h3>
          <button className="statusbtn" onClick={requestRegularPay}>
            일괄결제하기
          </button>
          <div>
            <ul>
              {data.map((data) => (
                <li key={data.no}>
                  {
                    <ul className="adminlist">
                      <p>no : {data.no}</p>
                      <p>펀딩번호 : {data.fundingno}</p>
                      <p>금액 : {data.monthlypaymentamount}</p>
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

export default RegularPayList;
