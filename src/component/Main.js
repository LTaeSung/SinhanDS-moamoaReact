import MemberHeader from "./member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../BootPath";
import { useContext } from "react";
import axios from "axios";

function Main() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/admin/getMainTotal`);
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
          <h3 className="sub_title">메인페이지</h3>
          <div>
            <p>총 챌린지 : {data.totalchallenge}</p>
            <p>총 성공자 수 : {data.totalsuccess}</p>
            <p>총 상금 : {data.totalmoney}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
