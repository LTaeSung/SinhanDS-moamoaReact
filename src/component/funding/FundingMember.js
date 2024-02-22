import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import BootPathContext from "./../../BootPath";

function FundingMember() {
  const bootPath = useContext(BootPathContext);
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);
  let fund_no = params.get("no");
  const getApi = async () => {
    axios
      .get(`${bootPath.bootpath}/funding/member/challenge/${fund_no}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("참여중인 인원이 없습니다.", error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      {data &&
        data.map((item) => (
          <div key={item.no}>
            {item.giveup === true ? null : item.participationdate ===
              null ? null : (
              <>
                <p id="member">{item.membername}</p>
                {item.settlementamount != null ? (
                  <p id="member_pay">정산금: {item.settlementamount}원</p>
                ) : null}
              </>
            )}
            <br></br>
          </div>
        ))}
      <br />
    </>
  );
}

export default FundingMember;
