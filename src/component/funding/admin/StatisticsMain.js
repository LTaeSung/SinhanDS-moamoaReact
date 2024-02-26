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
