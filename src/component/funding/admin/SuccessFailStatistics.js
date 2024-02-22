import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function SuccessFailStatistics() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        ` ${bootpath}/statistics/successAndFail`
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

  const chartdata = {
    labels: ["성공", "실패"],
    datasets: [
      {
        label: "명",
        data: [data.success, data.fail],
        backgroundColor: ["rgba(54, 162, 235, 0.4)", "rgba(255, 99, 132, 0.4)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="sub">
        <div className="size">
          <h3 className="sub_title">성공실패율</h3>
          <div className="chartArea">
            <Doughnut data={chartdata} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessFailStatistics;
