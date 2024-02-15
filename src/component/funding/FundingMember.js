import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";

function FundingMember() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({});

  let no = params.get("no");
  const getInfo = () => {
    axios.get(`${bootPath.bootpath}/fund/list/test`).then((res) => {
      setData(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="sub">
        <div className="size">
          <div>
            <p>제목: {data.title}</p>
            <p>목표 금액: {data.goalamount} 원</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FundingMember;
