import MemberHeader from "../member/MemberHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../BootPath";
import { useContext } from "react";
import axios from "axios";

function RegularPayList() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/fund/regularPaymentList`);
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
          <h3 className="sub_title">오늘 결제 예정 목록</h3>
          <div>
            <ul>
              {data.map((data) => (
                <li key={data.no}>
                  {
                    <ul>
                      <p>no : {data.no}</p>
                      <p>펀딩번호 : {data.fundingno}</p>
                      <p>금액 : {data.monthlypaymentamount}</p>
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
