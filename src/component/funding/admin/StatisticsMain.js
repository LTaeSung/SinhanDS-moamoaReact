import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import GiveupStatistics from "./GiveupStatistics";
import SuccessFailStatistics from "./SuccessFailStatistics";
import DefaultStatistics from "./DefaultStatistics";
import PersonalStatistics from "./PersonalStatistics";

function StatisticsMain() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);

  return (
    <>
      <AdminHeader />
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">통계페이지</h3>
          <div>
            <DefaultStatistics />
            <PersonalStatistics />
            <GiveupStatistics />
            <SuccessFailStatistics />
          </div>
        </div>
      </div>
    </>
  );
}

export default StatisticsMain;
