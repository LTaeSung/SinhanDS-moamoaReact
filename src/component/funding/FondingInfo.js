import FundingHeader from "./FundingHeader";
import React, {useEffect, useState} from "react";
import BootPath from "./../../BootPath";
import { useContext } from "react";
import fundingList from "./fundingList";
import axios from "axios";

function FundingInfo() {
  const { bootpath } = useContext(BootPath);
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const fund_no = sessionStorage.getItem("no");
            if (!fund_no) {
                console.log("사용자 번호가 없습니다.");
                return;
            }
            const response = await axios.get(
                ` ${bootpath}/funding/list?no=${fund_no}`
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
      <FundingHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">펀딩 상세내역</h3>
            <div>

            </div>
        </div>
      </div>
    </>
  );
}

export default FundingInfo;
