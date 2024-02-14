import { Link } from "react-router-dom";
import BootPath from "../../BootPath";
import React, { useEffect, useState, useContext } from "react";
import PlusPoint from "../point/PlusPoint";
import MinusPoint from "../point/MiusPoint";
import PointList from "../point/PointList";
import axios from "axios";

function MemberInfo() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");

  const getData = async () => {
    try {
      const response = await axios.get(
        ` ${bootpath}/member/info?member_no=${member_no}`
      );
      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
        console.log(response.data);
      }
      console.log(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  });

  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">회원정보</h3>
          {data && <p>사진: {data.photo}</p>}
          {data && <p>아이디: {data.email}</p>}
          {data && <p>이름: {data.name}</p>}
          {data && <p>보유포인트: {data.point}</p>}
          {data && <p>네이버 소셜 로그인: {data.email}</p>}
          <div>
            <Link to={"/point/PointList"}>내역</Link>
            <Link to={"/point/MiusPoint"}>인출</Link>
            <Link to={"/point/PlusPoint"}>충전</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberInfo;
