import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import "./Admin.css";

function DontAcceptRefuseInWeekMemberList() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        ` ${bootpath}/admin/DontAcceptRefuseInWeekMemberList`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const requestRefuse = async () => {
    try {
      const result = await axios.get(bootpath + "/admin/setFundStatus0To1");
      if (result.data === "success") {
        alert("펀딩 일괄 시작 성공");
      } else {
        alert("문제가 발생했습니다.");
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
          <h3 className="sub_title">초대마감일 지난 멤버 목록</h3>
          <button className="statusbtn" onClick={requestRefuse}>
            일괄 삭제 후 펀딩 시작 처리하기
          </button>
          <div>
            <ul>
              {data.map((data) => (
                <li key={data.no}>
                  {
                    <ul className="adminlist">
                      <p>no : {data.no}</p>
                      <p>펀딩번호 : {data.fundingno}</p>
                      <p>멤버번호 : {data.memberno}</p>
                      <p>초대일자 : {data.inviteddate}</p>
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

export default DontAcceptRefuseInWeekMemberList;
